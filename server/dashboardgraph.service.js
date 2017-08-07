const registerConsumerService = require('./common/kafkaConsumerService');
const communityDashboardGraphService = require('./communityservices/communityDashboardGraphService');

registerConsumerService(['CommunityLifecycleEvents'], { autoCommit: true }, communityDashboardGraphService);
