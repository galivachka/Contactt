import { FaFaceSadTear } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaCircleMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import "./Hero.scss";
import { memo, useState } from "react";

const Hero = () => {
  const [addMenu, setAddMenu] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [search, setSearch] = useState("");
  const [local, setLocal] = useState(() => {
    const storegeItem = localStorage.getItem("data");
    return storegeItem ? JSON.parse(storegeItem) : [];
  });
  const [edit, setEdit] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(edit !== null) {
      const updateLocal = local.map((items) => {
        if (items.id === edit) {
          return { ...items, photoUrl: photoUrl,name: name,tel: tel};
        }else {
          return items;
        }
      })
      setLocal(updateLocal);
      setEdit(null)
      setPhotoUrl("");
      setName("");
      setTel("");
    }else {
      setLocal([
        ...local,
        {
          id:Date.now(),
          photoUrl: photoUrl,
          name: name,
          tel: tel,
        }
      ])
      setPhotoUrl("");
      setName("")
      setTel("");
}
};
localStorage.setItem("data",JSON.stringify(local));
const handleDelete = (id) => {
  const updataLocal = local.filter((items) => items.id !== id);
  return  setLocal(updataLocal);
}
const handleEdit = (id) => {
  const findId = local.find((item) => item.id === id);
  setPhotoUrl(findId.photoUrl);
  setEdit(id);
  setName(findId.name);
  setTelephone(findId.tel);
}
const filteredLocal = local
.filter((items) => {
  if (!search.trim()) {
    return items;
  } else if (items.name.toLowerCase().includes(search.toLowerCase())) {
    return items;
  }
  return null;
})
.map((items) => (
  <div className="hero__item" key={items.id}>
    <div className="hero__item-img">
      <img
        src={
          items.photoUrl
            ? items.photoUrl
            : "https://contacts-sn.netlify.app/assets/placeholder_user.b5ae7217.png"
        }
        alt="default contact img!"
      />
    </div>
    <div className="hero__item-info">
      <h2 className="hero__item-info-title">{items.name}</h2>
      <p className="hero__item-info-text">+998 {items.tel}</p>
    </div>
    {addMenu ? null : (
      <div className="hero__item-edit" onClick={() => handleEdit(items.id)}>
        <FaUserEdit
          style={{
            cursor: "pointer",
            color: "white",
            fontSize: "27px",
          }}
        />
      </div>
    )}
    <div
      className="hero__item-delete"
      onClick={() => handleDelete(items.id)}>
      <MdDelete
        style={{
          fontSize: "27px",
          color: "white",
        }}
      />
    </div>
  </div>
));
const hero_info = () => {
  return (
    <div className="hero__info">
     
      <strong className="hero__info-title">No contacts </strong>
      <p className="hero__info-text">Please add contacts</p>
    </div>
  );
};
return (
  <>
    <section className="hero">
        <div className="container">
          <div className="hero__block">
            <div className="hero__content-block">
              {addMenu ? (
                <div
                  className="hero__add-menu"
                  onClick={() => setAddMenu(!addMenu)}>
                  <BsFillPersonPlusFill className="BsFillPersonPlusFill" /> Add
                  or Edit
                </div>
              ) : (
                <FaCircleMinus
                  className="FaCircleMinus"
                  onClick={() => setAddMenu(!addMenu)}
                />
              )}
              {addMenu ? (
                ""
              ) : (
                <form className="hero__form" onSubmit={handleSubmit}>
                  <input
                    type="url"
                    autoComplete="off"
                    placeholder="Photo url *"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    autoComplete="off"
                    placeholder="Number *"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                  />
                  <button type="submit" className="hero__add-btn">
                    <IoAddCircle className="IoAddCircle" />
                  </button>
                </form>
              )}
              <div className="hero__search-input">
                <input
                  type="search"
                  autoComplete="off"
                  placeholder="Search contact..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="hero__list">{filteredLocal}</div>
              {local.length > 0 ? null : hero_info()}
            </div>
          </div>
        </div>
      </section>
  </>
); 
              }
export default memo(Hero)
