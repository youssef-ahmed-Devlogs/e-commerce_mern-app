import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const limitText = (text, limit = 15) => `${text.substring(0, limit)}...`;
  return (
    <Card className="product mb-4">
      <Card.Img src={product.images[0]} />
      <Card.Body>
        <Card.Title>
          <Link to={`/products/${product.id}`} className="text-decoration-none">
            {limitText(product.title)}
          </Link>
        </Card.Title>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
