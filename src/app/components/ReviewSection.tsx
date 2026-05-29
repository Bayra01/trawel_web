import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

interface Review {
  id: string;
  destinationId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  destinationId: string;
}

export function ReviewSection({ destinationId }: ReviewSectionProps) {
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${destinationId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [destinationId]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Нэвтрэх хуудас руу шилжүүлэх
      navigate('/auth');
      return;
    }

    if (!newComment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      destinationId,
      userName: user?.fullName || 'Anonymous',
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${destinationId}`, JSON.stringify(updatedReviews));

    // Reset form
    setNewComment('');
    setNewRating(5);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (language === 'mn') {
      if (diffMins < 60) return `${diffMins} минутын өмнө`;
      if (diffHours < 24) return `${diffHours} цагийн өмнө`;
      if (diffDays < 7) return `${diffDays} өдрийн өмнө`;
      return date.toLocaleDateString('mn-MN');
    } else if (language === 'ko') {
      if (diffMins < 60) return `${diffMins}분 전`;
      if (diffHours < 24) return `${diffHours}시간 전`;
      if (diffDays < 7) return `${diffDays}일 전`;
      return date.toLocaleDateString('ko-KR');
    } else {
      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString('en-US');
    }
  };

  return (
    <div className="mb-12">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8">
        {language === 'mn' ? 'Сэтгэгдлүүд' : language === 'ko' ? '리뷰' : 'Reviews & Ratings'}
        <span className="text-gray-500 text-xl ml-3">({reviews.length})</span>
      </h2>

      {/* Write Review Form */}
      {isAuthenticated ? (
        <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">
            {language === 'mn' ? 'Сэтгэгдэл үлдээх' : language === 'ko' ? '리뷰 작성' : 'Write a Review'}
          </h3>
          
          <form onSubmit={handleSubmitReview} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'mn' ? 'Үнэлгээ' : language === 'ko' ? '평점' : 'Rating'}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || newRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-lg font-semibold text-gray-700">
                  {newRating} / 5
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'mn' ? 'Сэтгэгдэл' : language === 'ko' ? '후기' : 'Your Review'}
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                placeholder={
                  language === 'mn'
                    ? 'Энэ газрын тухай өөрийн туршлагаа хуваалцана уу...'
                    : language === 'ko'
                    ? '이 장소에 대한 경험을 공유하세요...'
                    : 'Share your experience about this destination...'
                }
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-sky-700 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              {language === 'mn' ? 'Сэтгэгдэл илгээх' : language === 'ko' ? '리뷰 제출' : 'Submit Review'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-3 text-gray-700">
              {language === 'mn' ? 'Сэтгэгдэл үлдээхийн тулд нэвтэрнэ үү' : language === 'ko' ? '리뷰를 작성하려면 로그인하세요' : 'Sign in to Write a Review'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'mn'
                ? 'Өөрийн аяллын туршлагаа бусадтай хуваалцахын тулд нэвтэрч орно уу.'
                : language === 'ko'
                ? '여행 경험을 다른 사람들과 공유하려면 로그인하세요.'
                : 'Sign in to share your travel experience with others.'}
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="inline-block bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
            >
              {language === 'mn' ? 'Нэвтрэх / Бүртгүүлэх' : language === 'ko' ? '로그인 / 가입' : 'Sign In / Sign Up'}
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">
              {language === 'mn'
                ? 'Сэтгэгдэл хараахан байхгүй байна. Анхних нь болоорой!'
                : language === 'ko'
                ? '아직 리뷰가 없습니다. 첫 번째가 되어보세요!'
                : 'No reviews yet. Be the first to share your experience!'}
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">
                    {review.userName}
                  </h4>
                  <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}