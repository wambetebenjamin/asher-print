import Link from "next/link";
import { Printer } from "lucide-react";

export default function NotFound() {
  return (
    <section aria-label="Page not found">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <span className="service-icon-zip" aria-hidden="true">
          <Printer size={32} aria-hidden="true" />
        </span>
        <h1 className="mt-12">404</h1>
        <p className="mt-3 text-xl text-heading">This product is not in our catalogue.</p>
        <p className="mt-3">
          The page you asked for does not exist. It may have moved, or the link
          may be old. Our full catalogue is one click away, and if you need
          something unusual, ask us. We print a lot more than we can list.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn-primary-zip solid">
            Back to Products
          </Link>
          <Link href="/" className="btn-primary-zip">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
