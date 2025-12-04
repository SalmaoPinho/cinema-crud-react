export default function HomePages() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-3">
            <h1 className="display-5 fw-bold">Welcome</h1>
            <p className="col-md-8 fs-4">This is a simple homepage. Use the navbar above — the dropdown and toggler are powered by Bootstrap.</p>
            <button className="btn btn-primary btn-lg me-2" type="button">Primary action</button>
            <button className="btn btn-outline-secondary btn-lg" type="button">Secondary</button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <h2>About this demo</h2>
            <p>Remove or edit this page to suit your app. Navigation dropdowns should expand when clicked.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
