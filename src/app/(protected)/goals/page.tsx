export default function GoalsPage() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <header className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-display-lg-mobile md:font-display-lg text-primary mb-xs font-semibold">Financial Goals</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Track and achieve your aspirations.</p>
        </div>
        <button className="clay-button-primary px-6 py-3 rounded-full font-label-sm text-label-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span> Create Goal
        </button>
      </header>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter pb-10">
        
        {/* Goal Card 1 */}
        <article className="bg-surface rounded-3xl p-lg clay-raised flex flex-col gap-6 relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-container clay-sunken flex items-center justify-center relative">
                {/* Circular Progress */}
                <svg className="w-16 h-16 transform -rotate-90 absolute top-0 left-0">
                  <circle className="text-surface-variant" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="transition-all duration-1000 ease-out" cx="32" cy="32" fill="transparent" r="28" stroke="url(#gradient1)" strokeDasharray="175.93" strokeDashoffset="61.57" strokeWidth="4"></circle>
                  <defs>
                    <linearGradient id="gradient1" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f378a"></stop>
                      <stop offset="100%" stopColor="#c9a74d"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="material-symbols-outlined text-primary text-[28px] z-10">flight_takeoff</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[24px] font-medium text-on-surface">Euro Trip</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">Target: Aug 2025</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-surface clay-raised flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 z-10">
            <div className="bg-surface-container rounded-xl p-4 clay-sunken">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Saved</p>
              <p className="font-num-xl text-num-xl text-primary">₹3,25,000</p>
            </div>
            <div className="bg-surface-container rounded-xl p-4 clay-sunken">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Target</p>
              <p className="font-num-xl text-num-xl text-on-surface">₹5,00,000</p>
            </div>
          </div>

          {/* AI Insight */}
          <div className="mt-2 bg-surface-container-low rounded-xl p-4 clay-insight border border-primary-fixed/30 flex items-start gap-3 z-10">
            <span className="material-symbols-outlined text-primary mt-0.5 icon-fill">smart_toy</span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              <strong className="text-primary font-medium">Insight:</strong> To hit this target by August, cut ₹800/week from dining out.
            </p>
          </div>
        </article>

        {/* Goal Card 2 */}
        <article className="bg-surface rounded-3xl p-lg clay-raised flex flex-col gap-6 relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-container clay-sunken flex items-center justify-center relative">
                <svg className="w-16 h-16 transform -rotate-90 absolute top-0 left-0">
                  <circle className="text-surface-variant" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="transition-all duration-1000 ease-out" cx="32" cy="32" fill="transparent" r="28" stroke="url(#gradient2)" strokeDasharray="175.93" strokeDashoffset="140.74" strokeWidth="4"></circle>
                  <defs>
                    <linearGradient id="gradient2" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f378a"></stop>
                      <stop offset="100%" stopColor="#c9a74d"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="material-symbols-outlined text-primary text-[28px] z-10">home</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[24px] font-medium text-on-surface">Down Payment</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">Target: Dec 2026</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-surface clay-raised flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 z-10">
            <div className="bg-surface-container rounded-xl p-4 clay-sunken">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Saved</p>
              <p className="font-num-xl text-num-xl text-primary">₹5,00,000</p>
            </div>
            <div className="bg-surface-container rounded-xl p-4 clay-sunken">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Target</p>
              <p className="font-num-xl text-num-xl text-on-surface">₹25,00,000</p>
            </div>
          </div>

          {/* AI Insight */}
          <div className="mt-2 bg-surface-container-low rounded-xl p-4 clay-insight border border-primary-fixed/30 flex items-start gap-3 z-10">
            <span className="material-symbols-outlined text-primary mt-0.5 icon-fill">trending_up</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Moving ₹50k to an index fund could accelerate this by 4 months.</p>
          </div>
        </article>

      </div>
    </div>
  )
}
