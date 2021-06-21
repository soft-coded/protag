import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import "./item-page.scss";
import data from "../../data/sales-data";
import Card from "../../components/sales-card/SalesCard";

export default function Itempage() {
  const id = Number(useParams<{ id: string }>().id);
  const item = data.find(item => item.id === id);
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return item ? (
    <main className="item-page">
      <div className="inner">
        <Card item={item} className="card" isItem={true} />
      </div>
    </main>
  ) : (
    <Redirect to="/" />
  );
}
