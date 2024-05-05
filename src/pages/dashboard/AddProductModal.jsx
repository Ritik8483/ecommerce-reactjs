import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../redux/api/api";
import { addProductCode, updateProductCode } from "../../constants/constants";
import { modalCrossStyle, modalStyles } from "../../styles/style";
import { addProductSchema } from "../../schema/schema";
import { openAlert } from "../../redux/slices/snackbarSlice";
import Input from "../../components/reuseables/Input";
import Buttons from "../../components/reuseables/Buttons";

const AddProductModal = ({ open, onClose, productDetail }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    resolver: yupResolver(addProductSchema),
    defaultValues: productDetail,
  });

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmitForm = async (data) => {
    const { name, description, price } = data;
    try {
      if (productDetail?._id) {
        if (
          name === productDetail?.name &&
          description === productDetail?.description &&
          price === productDetail?.price
        )
          return;
        else {
          const payload = {
            url: "product",
            id: productDetail?._id,
            body: data,
          };
          const resp = await updateProduct(payload).unwrap();
          if (resp?.code === updateProductCode) {
            dispatch(
              openAlert({
                type: "success",
                message: resp.message,
              })
            );
            onClose();
          }
        }
      } else {
        const payload = {
          url: "product",
          body: data,
        };
        const resp = await addProduct(payload).unwrap();
        if (resp?.code === addProductCode) {
          dispatch(
            openAlert({
              type: "success",
              message: resp.message,
            })
          );
          onClose();
        }
      }
    } catch (error) {
      dispatch(
        openAlert({
          type: "error",
          message: error?.data?.error,
        })
      );
      console.log("error", error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <CloseIcon onClick={onClose} sx={modalCrossStyle} />
          <Typography variant="h5" padding="10px 20px">
            {productDetail?._id ? "Update" : "Add"} Product
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
              padding="20px"
            >
              <Input
                type="text"
                register={register}
                name="name"
                label="Product Name"
                placeholder="Enter Product name"
                errorMessage={errors.name?.message}
              />
              <Input
                type="text"
                register={register}
                name="description"
                label="Product Description"
                placeholder="Enter Product description"
                errorMessage={errors.description?.message}
              />
              <Input
                type="number"
                register={register}
                name="price"
                label="Product Price"
                placeholder="Enter Product price"
                errorMessage={errors.price?.message}
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap="20px"
                bottom="20px"
                position="absolute"
                right="20px"
              >
                <Buttons
                  color="error"
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                  onClick={onClose}
                  text="Cancel"
                />
                <Buttons
                  disabled={isSubmitting}
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                  text={
                    productDetail?._id && isSubmitting
                      ? "Updating..."
                      : productDetail?._id
                      ? "Update"
                      : isSubmitting
                      ? "Submitting..."
                      : "Submit"
                  }
                  type="submit"
                />
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddProductModal;
