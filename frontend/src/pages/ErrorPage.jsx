import React from "react";

function ErrorPage() {
  return (
    <section className="page_404 bg-white  py-40 font-serif">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="contant_box_404 mt-20">
                <h3 className="text-4xl font-bold mb-8">
                  OOPS!... Something Went Wrong
                </h3>
                <p>
                  {" "}
                  try refreshing the page or contact our support team if the
                  problem persists
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
