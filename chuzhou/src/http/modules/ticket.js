import axios from "../api";

//----------------------------------------------------------------
//个人票务
//----------------------------------------------------------------
export const POrder = (traveldate, people_quantity, contactname, contactmobile, idcardno, child_quantity, ordertype = 1, groupname = '') =>
  axios(
    STATIC_PW_URL + "index.php?g=mapi&m=order&a=order_ticket", {
      traveldate,
      people_quantity,
      contactname,
      contactmobile,
      idcardno,
      child_quantity,
      ordertype,
      groupname
    },
    "POST",
    true
  );
// 获取门票信息
// export const GetOrderDate = () =>
//   axios(
//     STATIC_PW_URL + "index.php?g=mapi&m=order&a=order_date", {},
//     "GET",
//     true
//   );
// 查询
export const SearchOrder = (traveldate, idcardno) =>
  axios(
    STATIC_PW_URL + "index.php?g=mapi&m=order&a=search_order", {
      traveldate,
      idcardno
    },
    "GET",
    true
  );
// 获取门票信息
export const GetOrderDate = (ordertype) =>
  axios(
    STATIC_PW_URL + "index.php?g=mapi&m=order&a=order_date", {
      ordertype,
    },
    "GET",
    true
  );
