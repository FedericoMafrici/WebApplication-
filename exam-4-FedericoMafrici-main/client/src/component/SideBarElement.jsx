import { Link } from "react-router-dom";

function SidebarElement({ title, link, active }) {
  return (
    active ?
      <Link className="nav-link active" to={link}>
        <svg className="bi me-2" width="1em" height="1em" />
        {title}
      </Link>
      :
      <Link className="nav-link link-dark" to={link}>
        <svg className="bi me-2" width="1em" height="1em" />
        {title}
      </Link>
  );
}
export {SidebarElement};