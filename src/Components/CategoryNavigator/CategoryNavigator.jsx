import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 * CategoryNavigator component
 * @property {Object} category - The category object
 * @returns {JSX.Element} The CategoryNavigator component
 */
const CategoryNavigator = ({ item }) => {  // Destructure item directly here
  const { sellerId, sellerName } = useParams();
  const navigate = useNavigate();

  /**
   * Function to navigate to the category page
   */
  const categoryNavigator = () => {
    if (sellerId && sellerId !== "0") {  // Make sure to check sellerId as a string if needed
      navigate(
        `/product/seller/${sellerId}/${sellerName}/category/${item.id}/${item.name}`,
        {
          state: { id: sellerId, firstName: sellerName },
        }
      );
    } else {
      navigate(`/product/category/${item.id}/${item.name}`);
    }
  };

  return (
    <b className="text-color" onClick={categoryNavigator}>
      <i>{item.name}</i>
    </b>
  );
};

export default CategoryNavigator;
