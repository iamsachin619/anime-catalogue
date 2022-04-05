import { Panel } from "rsuite";
import "./AnimeCard.css";
export default function AnimeCard({ item, handleModalOpen }) {
  return (
    <div
      onClick={() => {
        handleModalOpen(item.id);
      }}
    >
      <Panel
        shaded
        bordered
        bodyFill
        className="card"
        style={{ display: "inline-block", width: 240 }}
      >
        <img className="cardImage" src={item.image} height="240" />
        <Panel header={item.title}>
          <p>By {item.producer}</p>
          <p>
            <small>{item.release_date}</small>
          </p>
        </Panel>
      </Panel>
    </div>
  );
}
