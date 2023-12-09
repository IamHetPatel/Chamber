const ExploreItem = ({
    id,
    name,
    pool,
    tokens,
    setOpenModal,
    setSelectedTitle,
    setSelectedId
  }) => {
    return (
      <div
        className="explore-item"
        onClick={() => {
          setOpenModal(true);
          setSelectedTitle(name);
          setSelectedId(id)
        }}
      >
        <div className="explore-item-col">{id}</div>
        <div className="explore-item-col">{name}</div>
        <div className="explore-item-col">{pool}</div>
        <div className="explore-item-col">{tokens}</div>
      </div>
    );
  };
  
  export default ExploreItem;
  