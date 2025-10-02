import { isAdmin } from "../../utils.js";

isAdmin().then(admin => {
  if(!admin) window.location.href = '/unauthorized.html';
});
