


import React from 'react';

export default function HomePage() {
  return (
    <div className="container mt-5 vh-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className=" text-center">
          <h1 className="display-4">Welcome to the Quick Orders System</h1>
          <p className="lead my-3">Start by navigating to the login page.</p>
          <a href="/login" className="btn btn-primary btn-lg mt-3">Login</a>
        </div>
      </div>
    </div>
  );
}

// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Welcome to the POS and KDS System</h1>
//       <ul>
//         <li>
//           <Link href="/pos" className="btn btn-primary">
//             Go to POS
//           </Link>
//         </li>
//         <li>
//           <Link href="/kds" className="btn btn-secondary mt-2">
//             Go to KDS
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// }
