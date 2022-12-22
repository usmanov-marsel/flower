import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullFlower: React.FC = () => {
  const [Flower, setFlower] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchFlower() {
      try {
        const { data } = await axios.get("https://63a49359821953d4f2b88053.mockapi.io/items/" + id);
        setFlower(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchFlower();
  }, []);

  if (!Flower) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={Flower.imageUrl} />
      <h2>{Flower.title}</h2>
      <h4>{Flower.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullFlower;
