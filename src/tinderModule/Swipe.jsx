import React, { useMemo, useRef, useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { database } from '../firebase';
import { ref, get,limitToFirst ,query} from 'firebase/database';

function Advanced() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const userRef = ref(database, 'users');

    get(query(userRef,limitToFirst(2)))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userList = Object.entries(userData).map(([userId, userDetails]) => ({
            id: userId,
            name: userDetails.name,
            profile: userDetails.profile,
            email: userDetails.email,
            rollNumber: userDetails.rollNumber,
            gender: userDetails.gender,
            college: userDetails.college,
          }));
          setUser(userList);
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(user.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(user.length)
        .fill(0)
        .map(() => React.createRef()),
    [user.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < user.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < user.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <style>
        {`
       
#root {
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  /* background: linear-gradient(#fff, #999); */
  background: linear-gradient(#e66465, #9198e5);
}

* {
  user-select: none;
}

#root>div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app {
  overflow: hidden;
}

.app>div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.row {
  flex-direction: row !important;
}

.row>* {
  margin: 5px;
}

h1 {
  font-family: 'Damion', cursive;
  color: #fff;
  text-shadow: 0px 0px 60px 0px rgba(0,0,0,0.30);
}

h2 {
  color: #fff;
}

.swipe {
  position: absolute;
}

.cardContainer {
  width: 90vw;
  max-width: 260px;
  height: 300px;
}

.card {
  position: relative;
  background-color: #fff;
  width: 80vw;
  max-width: 260px;
  height: 300px;
  box-shadow: 0px 0px 60px 0px rgba(0,0,0,0.30);
  border-radius: 20px;
  background-size: cover;
  background-position: center;
}

.cardContent {
  width: 100%;
  height: 100%;
}

.swipe:last-of-type {

}

.card h3 {
  position: absolute;
  bottom: 0;
  margin: 10px;
  color: #fff;
}

.infoText {
  width: 100%;
  justify-content: center;
  display: flex;
  color: #fff;
  animation-name: popup;
  animation-duration: 800ms;
}

.buttons {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 625px) {
  .buttonsc {
    flex-direction: column;
  }
}

.buttons button {
  flex-shrink: 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  background-color: #9198e5;
  transition: 200ms;
  margin: 10px;
  font-weight: bolder;
  width: 160px;
  box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.10);
}

.buttons button:hover {
  transform: scale(1.05);
}

@keyframes popup {
  0%   { transform: scale(1,1) }
  10%  { transform: scale(1.1,1.1) }
  30%  { transform: scale(.9,.9) }
  50%  { transform: scale(1,1) }
  57%  { transform: scale(1,1) }
  64%  { transform: scale(1,1) }
  100% { transform: scale(1,1) }
}
        `}
      </style>
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {user.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: `url(${character.profile})` }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>
          Swipe left!
        </button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>
          Undo swipe!
        </button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Advanced;
