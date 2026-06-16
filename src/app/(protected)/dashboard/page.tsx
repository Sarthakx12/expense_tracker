import { HeroOrb } from '@/components/dashboard/hero-orb'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-lg pb-10">
      {/* Hero Section */}
      <section className="stagger-1 relative clay-raised rounded-3xl p-lg md:p-xl flex flex-col md:flex-row items-center justify-between overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left gap-sm mb-lg md:mb-0">
          <h2 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">This Month's Spend</h2>
          <div className="font-display-xl text-display-xl text-primary font-bold flex items-baseline gap-unit">
            <span className="font-num-xl text-num-xl">₹</span>
            <span className="font-num-xl text-num-xl tracking-tighter">42,550</span>
          </div>
          <div className="mt-md px-md py-unit rounded-full clay-sunken inline-flex items-center gap-sm">
            <div className="w-2 h-2 rounded-full bg-tertiary"></div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">On track</span>
          </div>
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 relative z-10 flex-shrink-0">
          <HeroOrb />
        </div>
      </section>

      {/* AI Insight Banner */}
      <section className="stagger-2 clay-insight rounded-2xl p-md flex items-start gap-md border border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 clay-sunken z-10">
          <span className="material-symbols-outlined text-primary icon-fill">lightbulb</span>
        </div>
        <div className="z-10">
          <h3 className="font-label-sm text-label-sm text-primary mb-1">AI Insight</h3>
          <p className="font-body-md text-body-md text-on-surface">
            This week you spent 34% more on dining — <span className="font-num-md text-num-md text-on-surface font-semibold">₹2,400</span> from 3 late-night orders.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="stagger-3 grid grid-cols-1 md:grid-cols-3 gap-md md:gap-lg">
        {/* Stat Card 1 */}
        <div className="clay-raised rounded-2xl p-lg hover-tilt cursor-default flex flex-col justify-between h-full min-h-[140px]">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Income</span>
            <div className="w-8 h-8 rounded-full clay-sunken flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-sm">trending_up</span>
            </div>
          </div>
          <div className="font-num-xl text-num-xl text-on-surface">₹75,000</div>
        </div>

        {/* Stat Card 2 (Active/Focus) */}
        <div className="clay-raised rounded-2xl p-lg hover-tilt cursor-default flex flex-col justify-between h-full min-h-[140px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 aurora-gradient"></div>
          <div className="flex justify-between items-start mb-sm relative z-10">
            <span className="font-label-sm text-label-sm text-primary font-bold">Safe to spend today</span>
            <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm icon-fill">check_circle</span>
            </div>
          </div>
          <div className="font-num-xl text-num-xl aurora-text relative z-10">₹1,250</div>
        </div>

        {/* Stat Card 3 */}
        <div className="clay-raised rounded-2xl p-lg hover-tilt cursor-default flex flex-col justify-between h-full min-h-[140px]">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Net Balance</span>
            <div className="w-8 h-8 rounded-full clay-sunken flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">account_balance</span>
            </div>
          </div>
          <div className="font-num-xl text-num-xl text-on-surface">₹42,550</div>
        </div>
      </section>

      {/* Bottom Row: Charts & Transactions */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-lg stagger-4">
        {/* Category Breakdown */}
        <div className="clay-raised rounded-3xl p-lg hover-tilt flex flex-col h-full">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface">Category Breakdown</h3>
            <button className="p-unit rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-md">
            <div>
              <div className="flex justify-between text-sm mb-xs">
                <span className="font-label-sm text-label-sm text-on-surface flex items-center gap-unit">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Food
                </span>
                <span className="font-num-md text-num-md text-on-surface">₹12,400</span>
              </div>
              <div className="h-3 w-full clay-sunken rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-xs">
                <span className="font-label-sm text-label-sm text-on-surface flex items-center gap-unit">
                  <span className="w-2 h-2 rounded-full bg-tertiary inline-block"></span> Transport
                </span>
                <span className="font-num-md text-num-md text-on-surface">₹5,200</span>
              </div>
              <div className="h-3 w-full clay-sunken rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-tertiary to-tertiary-container rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-xs">
                <span className="font-label-sm text-label-sm text-on-surface flex items-center gap-unit">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span> Bills
                </span>
                <span className="font-num-md text-num-md text-on-surface">₹8,100</span>
              </div>
              <div className="h-3 w-full clay-sunken rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="clay-raised rounded-3xl p-lg flex flex-col h-full">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">Recent Transactions</h3>
            <a className="font-label-sm text-label-sm text-primary hover:underline" href="/transactions">View All</a>
          </div>
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between p-sm rounded-xl hover:bg-surface-container transition-colors group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full clay-sunken flex items-center justify-center bg-surface group-hover:bg-surface-container">
                  <span className="material-symbols-outlined text-on-surface-variant">restaurant</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md font-semibold text-on-surface leading-tight">Zomato</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Dining • HDFC CC</p>
                </div>
              </div>
              <div className="font-num-md text-num-md text-on-surface font-semibold">-₹850</div>
            </div>

            <div className="flex items-center justify-between p-sm rounded-xl hover:bg-surface-container transition-colors group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full clay-sunken flex items-center justify-center bg-surface group-hover:bg-surface-container">
                  <span className="material-symbols-outlined text-on-surface-variant">directions_car</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md font-semibold text-on-surface leading-tight">Uber</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Transport • UPI</p>
                </div>
              </div>
              <div className="font-num-md text-num-md text-on-surface font-semibold">-₹340</div>
            </div>

            <div className="flex items-center justify-between p-sm rounded-xl hover:bg-surface-container transition-colors group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full clay-sunken flex items-center justify-center bg-surface group-hover:bg-surface-container">
                  <span className="material-symbols-outlined text-on-surface-variant">shopping_bag</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md font-semibold text-on-surface leading-tight">Amazon</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Shopping • SBI Debit</p>
                </div>
              </div>
              <div className="font-num-md text-num-md text-on-surface font-semibold">-₹1,200</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
