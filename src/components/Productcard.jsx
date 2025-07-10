export default function ProductCard({ product }) {
  return (
    <div className="p-4 shadow rounded bg-white flex flex-col items-center">
      <img src={product.image} alt={product.name} className="h-32 w-32 object-cover"/>
      <h3 className="mt-2 font-bold">{product.name}</h3>
      <p>${product.price}</p>
      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Add to Cart</button>
    </div>
  )
}
