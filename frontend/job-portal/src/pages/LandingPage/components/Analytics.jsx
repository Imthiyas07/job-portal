import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Analytics = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      title: t('activeUsers'),
      value: '2.4M+',
      growth: '+15%',
    },
    {
      icon: Briefcase,
      title: t('jobsPosted'),
      value: '150K+',
      growth: '+22%',
    },
    {
      icon: Target,
      title: t('successfulHires'),
      value: '89K+',
      growth: '+18%',
    },
    {
      icon: TrendingUp,
      title: t('matchRate'),
      value: '94%',
      growth: '+8%',
    }
  ];

  return (
    <section className="py-20 bg-[#F6F2F0] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#22252D] mb-6">
            {t('platform')}
            <span className="bg-[#F53900] bg-clip-text text-transparent"> {t('analytics')}</span>
          </h2>
          <p className="text-xl text-[#676664] max-w-3xl mx-auto">
            {t('analyticsSubtitle')}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#E5E5E5] p-6 rounded-2xl shadow-lg border border-[#E5E5E5] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#E5E5E5] rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#F53900]" />
                </div>
                <span className="text-[#F53900] text-sm font-semibold bg-[#F6F2F0] px-2 py-1 rounded-full">
                  {stat.growth}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-[#22252D] mb-2">{stat.value}</h3>
              <p className="text-[#676664]">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
