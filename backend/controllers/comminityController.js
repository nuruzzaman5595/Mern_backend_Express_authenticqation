import Community from '../models/Community.js';

export const createCommunity = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Community name is required' });
    }

    const community = await Community.create({
      name,
      description,
      category,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      message: 'Community created successfully',
      community,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating community', error: error.message });
  }
};

export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find().sort({ createdAt: -1 });
    return res.status(200).json(communities);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching communities', error: error.message });
  }
};

export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    return res.status(200).json(community);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching community', error: error.message });
  }
};

export const joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    if (community.members.includes(req.user?._id)) {
      return res.status(400).json({ message: 'User already joined this community' });
    }

    community.members.push(req.user._id);
    await community.save();

    return res.status(200).json({
      message: 'Joined community successfully',
      community,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error joining community', error: error.message });
  }
};

export default {
  createCommunity,
  getCommunities,
  getCommunityById,
  joinCommunity,
};
