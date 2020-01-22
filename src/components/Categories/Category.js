import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { rainbowStop } from "../../helpers/utils";
import AddToFavourite from "./AddToFavourite";
import { useAppState } from "../../store/app-state";
import { useSpring, animated } from "react-spring";

const CategoryLink = styled(Link)`
  width: 100%;
  height: 200px;
  display: block;
  color: #fff;
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0px 0px 7px black;
  padding: 0 10px;
  background-color: ${props => rainbowStop(props.id)};
  transition: 0.2s ease;
  &:hover {
    color: #fff;
  }
`;

const TiltedCategory = styled(animated.div)`
  width: 20%;
  margin: 2.5%;
  position: relative;
  box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.3);
  tranisiton: 0.2s ease;

  &:hover {
    box-shadow: 0px 12px 30px -5px rgba(0, 0, 0, 0.4);
    a {
      color: #fff;
      text-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);
    }
  }
`;

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];
const trans = (x, y, s) =>
  `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Category = ({ category, fav }) => {
  const [{ user }, dispatch] = useAppState();
  const { id, name } = category;
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 15, tension: 100, friction: 20 }
  }));

  const handleClick = id => {
    dispatch({ type: "CHANGE_GAME_STATE", game: { choosedCategory: id } });
  };
  return (
    <TiltedCategory
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    >
      <AddToFavourite fav={fav} id={id} uid={user.uid} name={name} />
      <CategoryLink
        to="/difficulty"
        id={id}
        children={name}
        onClick={() => handleClick(id)}
      />
    </TiltedCategory>
  );
};

export default memo(Category);
