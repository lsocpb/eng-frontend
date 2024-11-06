import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from "react-router-dom";

const styles = `
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

.fade-in-up {
  animation: fadeInUp 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

/**
 * Component that displays success stories from charity auctions.
 * @returns {Element}
 * @constructor
 */
const SuccessStories = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Navigates to the home page.
   */
  const handleNavigation = () => {
    navigate("/home");
  }

  const stories = [
    {
      id: 1,
      category: 'education',
      title: "School Building Project in Ghana",
      description: "Through our auction platform, we raised $15,000 to build a new school in Ghana, providing education access to over 300 children.",
      impact: "300+ students access to education",
      raised: "$150,000",
      image: "https://assets.globalpartnership.org/s3fs-public/styles/hero_stories/public/2023-06/ghana-classroom.jpg?VersionId=VsSO5BcsPqTlkZAMbnZ3h18Cih0z570l&itok=dVjT-KgU",
      partner: "Education For All Foundation"
    },
    {
      id: 2,
      category: 'healthcare',
      title: "Medical Equipment for Rural Clinic",
      description: "A successful campaign that provided essential medical equipment to a rural clinic in India, serving thousands of patients annually.",
      impact: "5,000+ patients served annually",
      raised: "$75,000",
      image: "https://www.nyadire.org/uploads/4/7/6/4/4764398/3527803_orig.jpeg",
      partner: "Global Health Initiative"
    },
    {
      id: 3,
      category: 'environment',
      title: "Reforestation Project Success",
      description: "Our community came together to fund the planting of 50,000 trees in deforested areas, creating new habitats for wildlife.",
      impact: "50,000 trees planted",
      raised: "$100,000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUZkJOCL0f-y-5rOhDHSMCxQCJL81RsiHvkA&s",
      partner: "Green Earth Alliance"
    },
    {
      id: 4,
      category: 'humanitarian',
      title: "Emergency Relief Fund",
      description: "Rapid response auction raising funds for emergency supplies following natural disasters in Southeast Asia.",
      impact: "10,000+ families received aid",
      raised: "$200,000",
      image: "https://dims.apnews.com/dims4/default/cb792b8/2147483647/strip/true/crop/4958x3305+0+0/resize/599x399!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F5c%2Faf%2F0f121e58f555743c7555fd07e491%2F0928f0436c914f88bf110dc288aded55",
      partner: "Rapid Relief Network"
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const StoryCard = ({ story }) => {
    const { ref, inView } = useInView({
      threshold: 0.2,
      triggerOnce: true
    });

    return (
      <div className="col-lg-6 mb-4">
        <div ref={ref}>
          {inView && (
            <div className="card h-100 shadow fade-in-up">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="badge bg-danger px-3 py-2 rounded-pill text-capitalize">
                    {story.category}
                  </span>
                  <span className="text-danger">
                    <i className="fas fa-heart"></i> {story.raised} raised
                  </span>
                </div>
                <div className="text-center mb-4">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '250px', width: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 className="fw-bold mb-3">{story.title}</h3>
                <p className="text-muted mb-4">{story.description}</p>
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <i className="fas fa-chart-line text-success me-2"></i>
                      <strong>Impact:</strong> {story.impact}
                    </div>
                    <small className="text-muted">
                      Partner: {story.partner}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const StatCard = ({ icon, value, label }) => {
    const { ref, inView } = useInView({
      threshold: 0.2,
      triggerOnce: true
    });

    return (
      <div className="col-md-3 mb-4">
        <div ref={ref}>
          {inView && (
            <div className="card text-center h-100 shadow fade-in">
              <div className="card-body p-4">
                <i className={`fas fa-${icon} fa-3x text-danger mb-3`}></i>
                <h2 className="fw-bold mb-2">{value}</h2>
                <p className="text-muted mb-0">{label}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <style>{styles}</style>

      <div className="card bg-light shadow mb-5 fade-in">
        <div className="card-body text-center py-5">
          <i className="fas fa-star fa-3x text-danger mb-4"></i>
          <h1 className="display-4 fw-bold mb-4">Success Stories</h1>
          <p className="lead text-muted mb-4">
            Discover how our charity auctions have made real impacts in communities worldwide.
            Every bid contributes to these amazing transformations.
          </p>
          <button className="btn btn-danger rounded-pill px-5 py-3 btn-lg" onClick={handleNavigation}>
            Start Your Own Success Story
          </button>
        </div>
      </div>

      <div className="row mb-5">
        <StatCard
          icon="hand-holding-heart"
          value="$525K+"
          label="Total Funds Raised"
        />
        <StatCard
          icon="users"
          value="15,000+"
          label="Lives Impacted"
        />
        <StatCard
          icon="globe-americas"
          value="4"
          label="Countries Reached"
        />
        <StatCard
          icon="check-circle"
          value="100%"
          label="Funds to Charities"
        />
      </div>

      <div className="row mb-5">
        <div className="col text-center">
          <button
            className={`btn mx-2 rounded-pill ${activeFilter === 'all' ? 'btn-danger' : 'btn-light'}`}
            onClick={() => setActiveFilter('all')}
          >
            All Stories
          </button>
          {['education', 'healthcare', 'environment', 'humanitarian'].map((category) => (
            <button
              key={category}
              className={`btn mx-2 rounded-pill ${activeFilter === category ? 'btn-danger' : 'btn-light'}`}
              onClick={() => setActiveFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        {stories
          .filter(story => activeFilter === 'all' || story.category === activeFilter)
          .map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
      </div>

      <div className="card bg-danger text-white shadow mt-5 fade-in">
        <div className="card-body text-center py-5">
          <i className="fas fa-heart fa-3x mb-4"></i>
          <h2 className="fw-bold mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-4">
            Join our community of changemakers and create your own success story.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;