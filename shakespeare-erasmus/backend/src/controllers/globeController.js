exports.getAllCountries = async (req, res, next) => {
  try {
    // Return dummy data for now
    res.json({
      success: true,
      data: {
        countries: [
          {
            id: 'india',
            name: 'India',
            coordinates: { latitude: 20.5937, longitude: 78.9629 },
            color: '#C43D12',
            description: 'Unveiling the vibrant fusion of classical Elizabethan drama and the rich tapestry of Indian folk traditions.',
            quote: 'The course of true love never did run smooth, yet in the dance of Kathakali, it finds its eternal rhythm.',
            participants: [
              {
                id: 'p_001',
                name: 'Rajesh Kumar',
                role: 'Lead Director',
                image: '/assets/people/rajesh.jpg'
              }
            ]
          }
        ]
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getCountryById = async (req, res, next) => {
  try {
    res.json({ success: true, data: { id: req.params.id } });
  } catch (err) {
    next(err);
  }
};

exports.getParticipants = async (req, res, next) => {
  try {
    res.json({ success: true, data: [] });
  } catch (err) {
    next(err);
  }
};
