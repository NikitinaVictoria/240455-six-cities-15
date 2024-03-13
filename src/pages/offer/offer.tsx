import { ChangeEvent } from 'react';
import { AuthorizationStatus } from '../../const';
import {REVIEWS_COUNT} from '../../mock/review.ts';
import { TypeOffer, TypeReview } from '../../types';
import OfferGallery from './components/offer-gallery';
import PremiumMark from '../../components/ui/premium-mark';
import BookmarkButton from '../../components/ui/bookmark-button';
import OfferInside from './components/offer-inside';
import ReviewsList from './components/reviews-list';
import ReviewsForm from './components/reviews-form';
import Map from '../../components/map';
import PlacesList from '../../components/places-list.tsx';
import NotFound from '../not-found/not-found.tsx';
import { useParams } from 'react-router-dom';

type OfferProps = {
  offers: TypeOffer[];
  reviews: TypeReview[];
  authorizationStatus: AuthorizationStatus;
  onReview: (review: ChangeEvent<HTMLTextAreaElement> | string, starCount: ChangeEvent<HTMLInputElement> | string) => void;
}

export default function Offer({ offers, reviews, authorizationStatus, onReview}: OfferProps): JSX.Element {
  const { id } = useParams();
  const currentOffer: TypeOffer | undefined = offers.find((offer: TypeOffer) => offer.id === id);

  if (!currentOffer) {
    return <NotFound />;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery gallery={currentOffer.images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            {currentOffer.isPremium && <PremiumMark offerClass />}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentOffer.title}
              </h1>
              <BookmarkButton isFavorite={currentOffer.isFavorite} offerClass width={31} height={33} />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width:'80%'}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {currentOffer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {currentOffer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {currentOffer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <OfferInside goods={currentOffer.goods} />
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {currentOffer.host.name}
                </span>
                <span className="offer__user-status">
                  {currentOffer.host.isPro}
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentOffer.description}
                </p>
                <p className="offer__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{REVIEWS_COUNT}</span></h2>
              <ReviewsList reviews={reviews} />
              {authorizationStatus === AuthorizationStatus.Auth &&
              <ReviewsForm onReview={onReview}/>}
            </section>
          </div>
        </div>
        <Map offerClass />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList offers={offers} near />
        </section>
      </div>
    </main>
  );
}
