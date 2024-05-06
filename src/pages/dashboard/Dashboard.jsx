import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginDetails } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { openAlert } from "../../redux/slices/snackbarSlice";
import { Box, Button, Typography } from "@mui/material";
import Buttons from "../../components/reuseables/Buttons";
import {
  serialno,
  limit,
  tableHeadings,
  deleteProductCode,
} from "../../constants/constants";
import useDebounce from "../../hooks/useDebounce";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/api/api";
import SearchField from "../../components/reuseables/SearchField";
import NoDataFound from "../../components/reuseables/NoDataFound";
import SkeletonTable from "../../components/reuseables/SkeletonTable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, StyledTableRow } from "../../styles/style";
import PaginationTable from "../../components/reuseables/Pagination";
import AlertBox from "../../components/reuseables/AlertBox";
import AddProductModal from "./AddProductModal";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  storeCartArr,
  storeCartItems,
  storeCartValues,
} from "../../redux/slices/cartSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedToken = useSelector((state) => state?.authSlice?.userToken);
  const cartValuesArr = useSelector((state) => state?.cartSlice?.cartValuesArr);
  const addedcartArr = useSelector((state) => state?.cartSlice?.addedcartArr);
  const cartItemsArr = useSelector((state) => state?.cartSlice?.cartItemsArr);

  const [openAlertBox, setOpenAlertBox] = useState({
    data: {},
    state: false,
  });
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const debouncedValue = useDebounce(searchText, 500);
  const [cart, setCart] = useState(cartValuesArr || []);
  const [cartItems, setCartItems] = useState(cartItemsArr || []);
  const [cartData, setCartData] = useState(addedcartArr || []);

  const payload = {
    url: "product",
    page: currentPage,
    limit: limit,
    search: debouncedValue || "",
  };

  const { data, isLoading, error } = useGetAllProductsQuery(payload);
  const [deleteProduct] = useDeleteProductMutation();

  const handleClose = () => {
    setOpenAlertBox({
      data: {},
      state: false,
    });
  };

  const handleAddProduct = () => {
    setProductDetail({});
    setOpenProductModal(true);
  };

  const handleEdit = (item) => {
    setOpenProductModal(true);
    setProductDetail(item);
  };

  const handleDeleteProduct = async () => {
    try {
      const payload = {
        url: "product",
        id: openAlertBox.data._id,
      };
      const resp = await deleteProduct(payload).unwrap();
      if (resp?.code === deleteProductCode) {
        dispatch(
          openAlert({
            type: "success",
            message: resp.message,
          })
        );
        setOpenAlertBox(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    dispatch(clearLoginDetails());
    dispatch(storeCartArr([]));
    dispatch(storeCartItems([]));
    dispatch(storeCartValues([]));
    dispatch(
      openAlert({
        type: "error",
        message: "User logged out successfully!",
      })
    );
    navigate("/");
  };

  const handleRemoveAll = () => {
    dispatch(storeCartArr([]));
    dispatch(storeCartItems([]));
    dispatch(storeCartValues([]));
    setCart([]);
    setCartItems([]);
    setCartData([]);
  };

  const handleAddCart = (data) => {
    const existingCartItem = cart?.find((item) => item?.id === data._id);
    if (existingCartItem) {
      const cartItems = cart.map((item) => {
        if (item?.id === data?._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setCart(cartItems);
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: data._id,
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: 1,
        },
      ]);
    }    
  };

  const handleRemoveCart = (data) => {
    let cartArr = [...cart];
    const existingCartItem = cart.find((item) => item.id === data?._id);
    if (existingCartItem?.quantity > 1) {
      const cartItems = cart.map((item) => {
        if (item?.id === data?._id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      });
      setCart(cartItems);
    } else {
      const filteredArr = cartArr.filter((item) => item.id !== data?._id);
      setCart(filteredArr);
    }
  };


  const handleViewCart = () => {
    dispatch(storeCartArr(cartData));
    dispatch(storeCartValues(cart));
    navigate("/cart", {
      state: {
        cartDetails: cartData,
      },
    });
  };

  const handleAddCartClick = (data) => {
    let emptyArr = [...cartItems];
    const index = emptyArr.findIndex((it) => it?._id === data?._id);
    if (index !== -1) {
      emptyArr.splice(index, 1);
    } else {
      emptyArr.push(data);
    }
    setCartItems(emptyArr);
    dispatch(storeCartItems(emptyArr));
    const onlyIds = emptyArr?.map((item) => item._id);
    const cartAddedData = cart?.filter((ite) => onlyIds.includes(ite?.id));
    setCartData(cartAddedData);
  };

  const onlyIds = cartItems?.map((item) => item._id);

  return (
    <Box padding="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Hi {storedToken?.name}</Typography>
        <Box display="flex" gap="20px" alignItems="center">
          <Buttons
            onClick={handleRemoveAll}
            type="button"
            variant="contained"
            text="Remove All"
          />
          <Buttons
            onClick={handleAddProduct}
            type="button"
            variant="contained"
            text="Add Product"
          />
          <Button
            onClick={handleViewCart}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            endIcon={<AddShoppingCartIcon />}
          >
            View Cart
          </Button>
          <LogoutIcon
            sx={{ cursor: "pointer" }}
            color="primary"
            onClick={() => setConfirmLogout(true)}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="start" marginY="24px">
        <SearchField
          setSearchText={setSearchText}
          searchText={searchText}
          placeholder="Search product by name/price"
        />
      </Box>

      {isLoading ? (
        <SkeletonTable
          variant="rounded"
          width="100%"
          height="calc(100vh - 180px)"
        />
      ) : !data?.data?.length ? (
        <NoDataFound text="No data Found" />
      ) : data?.data?.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {tableHeadings.map((item) => (
                    <StyledTableCell
                      align={item === serialno ? "left" : "center"}
                      key={item}
                    >
                      {item}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((item, index) => {
                  return (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell component="th" scope="row">
                        {currentPage === 1
                          ? index + 1
                          : limit * currentPage + 1 - limit + index}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.price}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Box
                          display="flex"
                          gap="15px"
                          justifyContent="flex-end"
                        >
                          <EditIcon
                            onClick={() => handleEdit(item)}
                            sx={{ cursor: "pointer", color: "#1976d2" }}
                          />
                          <DeleteIcon
                            onClick={() =>
                              setOpenAlertBox({ data: item, state: true })
                            }
                            sx={{ cursor: "pointer", color: "#1976d2" }}
                          />
                          <Box display="flex" alignItems="center" gap="10px">
                            <RemoveCircleOutlineIcon
                              onClick={() => handleRemoveCart(item)}
                              sx={{ cursor: "pointer" }}
                              variant="primary"
                            />
                            <Typography>
                              {cart.filter(
                                (items) => items?.id === item?._id
                              )[0]?.quantity || 0}
                            </Typography>
                            <AddCircleOutlineIcon
                              onClick={() => handleAddCart(item)}
                              sx={{ cursor: "pointer" }}
                              variant="primary"
                            />
                            <Buttons
                              onClick={() => handleAddCartClick(item)}
                              type="button"
                              dis
                              variant="contained"
                              text={
                                onlyIds.includes(item?._id)
                                  ? "Remove"
                                  : "Add to Cart"
                              }
                            />
                          </Box>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
            <PaginationTable
              totalCount={Math.ceil(data?.total / limit)}
              currentPage={currentPage}
              totalNumber={data?.total}
              setCurrentPage={setCurrentPage}
            />
          </TableContainer>
        </>
      ) : error ? (
        <NoDataFound text="Something went wrong" />
      ) : null}

      {openAlertBox && (
        <AlertBox
          open={openAlertBox.state}
          cancelText="No Cancel"
          confirmText="Yes Delete"
          mainHeaderText="Are you sure you want to delete this product?"
          userName={openAlertBox.data.firstName}
          onClose={handleClose}
          handleClick={handleDeleteProduct}
        />
      )}

      {confirmLogout && (
        <AlertBox
          open={confirmLogout}
          cancelText="No"
          confirmText="Yes"
          mainHeaderText="Are you sure you want to logout?"
          onClose={() => setConfirmLogout(false)}
          handleClick={handleLogout}
        />
      )}

      {openProductModal && (
        <AddProductModal
          open={openProductModal}
          onClose={() => setOpenProductModal(false)}
          productDetail={productDetail}
        />
      )}
    </Box>
  );
};

export default Dashboard;
