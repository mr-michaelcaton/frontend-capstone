import React, { useState, useEffect } from "react";

function StudyDeck({
  deck,
  flipped,
  flipHandler,
  nextHandler,
  lastCardHandler,
  cardIndex,
}) {

  const { cards } = deck;
  const [cardContent, setCardContent] = useState(
    cards ? cards[cardIndex].front : ""
  );

  useEffect(() => {
    if (cards) {
      flipped === true
        ? setCardContent(cards[cardIndex].back)
        : setCardContent(cards[cardIndex].front);
    }
  }, [flipped, cards, cardIndex]);

  return (
    <>
      <div className="card-body">
        <div className="row">
          {cards ? (
            <h5 className="card-title col-10">
              Card {cardIndex + 1} of {cards.length}
            </h5>
          ) : (
            <h5 className="card-title col-10">Loading...</h5>
          )}
        </div>
        <div className="row px-3">
          <h6 className="card-subtitle mb-2 text-muted">{cardContent}</h6>
        </div>

        {flipped === false ? (
          <div className="row">
            <div className="col-1">
              <button className="btn btn-secondary" onClick={flipHandler}>
                Flip
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-1">
              <button className="btn btn-secondary" onClick={flipHandler}>
                Flip
              </button>
            </div>
            {cardIndex !== cards.length - 1 ? (
              <div className="col-1">
                <button className="btn btn-primary" onClick={nextHandler}>
                  Next
                </button>
              </div>
            ) : (
              <div className="col-1">
                <button className="btn btn-primary" onClick={lastCardHandler}>
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default StudyDeck;
