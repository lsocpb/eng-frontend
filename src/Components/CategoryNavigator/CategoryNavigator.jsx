import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 * CategoryNavigator component
 * @property {Object} category - The category object
 * @returns {JSX.Element} The CategoryNavigator component
 */
const CategoryNavigator = ( {category} ) => {
  const { sellerId, sellerName } = useParams();

  const navigate = useNavigate();

  /**
   * Function to navigate to the category page
   */
  const categoryNavigator = () => {
    if (sellerId  && sellerId !== 0) {
      navigate(
        `/product/seller/${sellerId}/${sellerName}/category/${category.item.id}/${category.item.name}`,
        {
          state: { id: sellerId, firstName: sellerName },
        }
      );
    } else {
      navigate(`/product/category/${category.item.id}/${category.item.name}`);
    }
  };

  return (
    <b className="text-color" onClick={categoryNavigator}>
      <i>{category.item.name}</i>
    </b>
  );
};

export default CategoryNavigator;
