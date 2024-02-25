type BookmarkButtonProps = {
  isFavorite: boolean;
}

export default function BookmarkButton({isFavorite}: BookmarkButtonProps): JSX.Element {
  return (
    <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : null} button`} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>);
}
