import { useState } from "react";

export default function Player({ name, symbol, isActive, onchange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [player, setPlayer] = useState(name);

  const onClickHandler = () => {
    setIsEditing((wasEditing) => !wasEditing);

    if (isEditing) {
      onchange(symbol, player);
    }
  };
  const onChangeName = (event) => {
    setPlayer(event.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing && (
          <input type="text" value={player} required onChange={onChangeName} />
        )}
        {!isEditing && <span className="player-name">{player}</span>}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onClickHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
