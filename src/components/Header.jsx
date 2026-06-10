import data from '../data/home.json';

export default function Header() {
  const header = data.header[0];
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
            <br /><br /><br /><br />
            <h1 className="bold shadow">{header.name}</h1>
            <h2 className="white bold shadow">{header.title}</h2>
          </div>
        </div>
      </div>
    </header>
  );
}
