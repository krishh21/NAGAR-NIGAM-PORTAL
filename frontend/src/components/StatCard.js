import React from 'react';
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaMinus,
  FaChartLine,
  FaUser,
  FaBuilding,
  FaClipboardCheck,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  trend, 
  trendValue, 
  iconType = 'custom',
  loading = false 
}) => {
  // Define color schemes
  const colorSchemes = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-gray-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      iconBg: 'bg-green-100',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-gray-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-gray-600'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      iconBg: 'bg-orange-100',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-gray-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      iconBg: 'bg-purple-100',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-gray-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      iconBg: 'bg-red-100',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-gray-600'
    },
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-600',
      iconBg: 'bg-gray-100',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-gray-600'
    }
  };

  const colors = colorSchemes[color] || colorSchemes.blue;

  // Get predefined icons based on type
  const getPredefinedIcon = () => {
    const iconMap = {
      users: <FaUser className="w-5 h-5" />,
      department: <FaBuilding className="w-5 h-5" />,
      complaints: <FaClipboardCheck className="w-5 h-5" />,
      pending: <FaClock className="w-5 h-5" />,
      inProgress: <FaExclamationTriangle className="w-5 h-5" />,
      resolved: <FaCheckCircle className="w-5 h-5" />,
      trend: <FaChartLine className="w-5 h-5" />
    };
    return iconMap[iconType] || <FaChartLine className="w-5 h-5" />;
  };

  // Determine trend icon and color
  const getTrendIndicator = () => {
    if (!trendValue) return null;
    
    const trendNum = parseFloat(trendValue);
    if (trendNum > 0) {
      return {
        icon: <FaArrowUp className="w-3 h-3" />,
        color: colors.trendUp,
        text: `+${Math.abs(trendNum)}%`
      };
    } else if (trendNum < 0) {
      return {
        icon: <FaArrowDown className="w-3 h-3" />,
        color: colors.trendDown,
        text: `${trendNum}%`
      };
    } else {
      return {
        icon: <FaMinus className="w-3 h-3" />,
        color: colors.trendNeutral,
        text: '0%'
      };
    }
  };

  const trendData = getTrendIndicator();

  // Format value with commas for numbers
  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  if (loading) {
    return (
      <div className={`card border-2 ${colors.border} ${colors.bg} animate-pulse`}>
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className={`p-3 rounded-lg ${colors.iconBg}`}>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card border-2 ${colors.border} ${colors.bg} hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-end space-x-2">
            <p className={`text-3xl font-bold ${colors.text}`}>{formatValue(value)}</p>
            {trendData && (
              <div className={`flex items-center space-x-1 text-sm ${trendData.color} mb-1`}>
                {trendData.icon}
                <span>{trendData.text}</span>
              </div>
            )}
          </div>
          {trend && (
            <p className="text-sm text-gray-500 mt-2">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.iconBg} ${colors.text}`}>
          {icon ? icon : getPredefinedIcon()}
        </div>
      </div>
      
      {/* Optional progress bar for percentage values */}
      {typeof value === 'number' && value <= 100 && value >= 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${colors.bg.replace('bg-', 'bg-').split(' ')[0]} ${colors.text}`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Optional: Add propTypes for better development experience
StatCard.propTypes = {
  // title: PropTypes.string.isRequired,
  // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // icon: PropTypes.element,
  // color: PropTypes.oneOf(['blue', 'green', 'yellow', 'orange', 'purple', 'red', 'gray']),
  // trend: PropTypes.string,
  // trendValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // iconType: PropTypes.oneOf(['users', 'department', 'complaints', 'pending', 'inProgress', 'resolved', 'trend', 'custom']),
  // loading: PropTypes.bool
};

export default StatCard;