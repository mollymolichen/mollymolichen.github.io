export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <img
              src="/images/headshot.jpg"
              className="img-responsive img-circle tm-border"
              alt="Molly Chen"
            />
            <br /><br />
            <h1 className="tm-title bold shadow accent">Molly Chen</h1>
            <h1 className="white bold shadow">Technical Product Manager</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
