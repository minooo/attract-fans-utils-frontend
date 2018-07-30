import Loadable from "react-loadable";
import { Loading } from "0-components";

const loadPage = path =>
  Loadable({
    loader: () => import(`./${path}`),
    loading: Loading
  });

const Home = loadPage("0-home");
const List = loadPage("1-list");
const Detail = loadPage("2-detail");

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/list",
    component: List
  },
  {
    path: "/list_:id",
    component: Detail
  }
];
