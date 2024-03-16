const Product = (params) => {
  const { product } = params;
  const { title, description, price, rating, images } = product;
  const url = images[0];
  return (
    <div className="product">
      <img className="productImg" src={url} alt="url" />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>⭐{rating}</p>
    </div>
  );
};
export default Product;
