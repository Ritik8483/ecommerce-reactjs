import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Buttons from "../../components/reuseables/Buttons";
import NoDataFound from "../../components/reuseables/NoDataFound";

const CartDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quantities = location?.state?.cartDetails?.map(
    (item) => item?.quantity
  );
  const totalQty = quantities.reduce((x, y) => {
    return x + y;
  }, 0);

  return (
    <Box padding="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Total Items : {totalQty || 0}</Typography>
        <Buttons
          onClick={() => navigate(-1)}
          type="button"
          variant="contained"
          text="Back"
        />
      </Box>
      {!location?.state?.cartDetails?.length ? (
        <NoDataFound text="No data Found" />
      ) : (
        <Box
          display="flex"
          justifyContent="start"
          alignItems="center"
          overflow="auto"
          width="auto"
          flexWrap="wrap"
          gap="20px"
        >
          {location?.state?.cartDetails?.map((item) => {
            return (
              <Box
                key={item?.id}
                marginTop="20px"
                height="300px"
                width="400px"
                padding="20px"
                border="1px solid black"
              >
                <h5>Product Name : {item?.name}</h5>
                <h5>Product Description : {item?.description}</h5>
                <h5>Product Price : {item?.price}</h5>
                <h5>Quantity : {item?.quantity}</h5>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CartDetail;
