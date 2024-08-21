import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h2 className='text-center'>404 - Not Found</h2>
      <Link href={'/'}>Go back to Home page</Link>
    </div>
  );
}

export default NotFound;
