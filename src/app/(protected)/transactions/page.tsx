export default function TransactionsPage() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Section */}
      <header className="mb-lg">
        <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-xs">Transactions</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Review your recent financial activity.</p>
      </header>

      {/* Search & AI Quick Add */}
      <section className="flex flex-col md:flex-row gap-gutter mb-xl">
        {/* Search & Filters */}
        <div className="flex-1 space-y-md">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 rounded-xl clay-sunken border-none focus:ring-0 focus:outline-none focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.8),0_0_0_1.5px_#4f378a] font-body-md text-on-surface placeholder:text-outline-variant transition-all"
              placeholder="Search transactions..." 
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-sm">
            <button className="clay-raised px-4 py-2 rounded-full font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span> Date
            </button>
            <button className="clay-sunken px-4 py-2 rounded-full font-label-sm text-label-sm text-primary flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">category</span> Category
            </button>
            <button className="clay-raised px-4 py-2 rounded-full font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">account_balance</span> Source
            </button>
          </div>
        </div>

        {/* AI Quick Add */}
        <div className="flex-1">
          <div className="relative w-full h-full min-h-[60px]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-tertiary/10 rounded-xl blur-md -z-10"></div>
            <div className="relative w-full h-full flex items-center bg-surface rounded-xl p-1 clay-sunken aurora-border">
              <span className="material-symbols-outlined ml-3 mr-2 aurora-text">smart_toy</span>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none font-body-md text-on-surface placeholder:text-outline-variant px-2 h-full" 
                placeholder="e.g. chai 30, uber 220 office" 
                type="text"
              />
              <button className="bg-surface-container-high hover:bg-surface-dim rounded-lg p-2 mr-1 transition-colors">
                <span className="material-symbols-outlined text-primary">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction List */}
      <section className="space-y-md pb-10">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-md">Recent</h2>

        {/* Item 1 */}
        <div className="clay-raised rounded-xl p-md flex items-center justify-between hover-tilt cursor-pointer">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center shrink-0 clay-sunken">
              <span className="material-symbols-outlined text-on-error-container">directions_car</span>
            </div>
            <div>
              <h3 className="font-body-md text-body-md font-semibold text-on-surface">Uber Rides</h3>
              <div className="flex items-center gap-xs mt-1">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Transport</span>
                <span className="text-outline-variant text-[10px]">•</span>
                <span className="font-label-sm text-label-sm text-outline">Today, 9:42 AM</span>
              </div>
            </div>
          </div>
          <div className="font-num-md text-num-md text-on-surface text-right">
            -₹220.00
          </div>
        </div>

        {/* Item 2 */}
        <div className="clay-raised rounded-xl p-md flex items-center justify-between hover-tilt cursor-pointer">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center shrink-0 clay-sunken">
              <span className="material-symbols-outlined text-on-tertiary-container">local_cafe</span>
            </div>
            <div>
              <h3 className="font-body-md text-body-md font-semibold text-on-surface">Sharma Tapri</h3>
              <div className="flex items-center gap-xs mt-1">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Food & Dining</span>
                <span className="text-outline-variant text-[10px]">•</span>
                <span className="font-label-sm text-label-sm text-outline">Today, 8:15 AM</span>
              </div>
            </div>
          </div>
          <div className="font-num-md text-num-md text-on-surface text-right">
            -₹30.00
          </div>
        </div>

        {/* Item 3 */}
        <div className="clay-raised rounded-xl p-md flex items-center justify-between hover-tilt cursor-pointer">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0 clay-sunken">
              <span className="material-symbols-outlined text-on-primary-container">arrow_downward</span>
            </div>
            <div>
              <h3 className="font-body-md text-body-md font-semibold text-on-surface">Salary Credit</h3>
              <div className="flex items-center gap-xs mt-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Income</span>
                <span className="text-outline-variant text-[10px]">•</span>
                <span className="font-label-sm text-label-sm text-outline">Yesterday</span>
              </div>
            </div>
          </div>
          <div className="font-num-md text-num-md text-primary font-semibold text-right">
            +₹85,000.00
          </div>
        </div>

        {/* Item 4 */}
        <div className="clay-raised rounded-xl p-md flex items-center justify-between hover-tilt cursor-pointer">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 clay-sunken">
              <span className="material-symbols-outlined text-on-surface-variant">shopping_bag</span>
            </div>
            <div>
              <h3 className="font-body-md text-body-md font-semibold text-on-surface">Amazon India</h3>
              <div className="flex items-center gap-xs mt-1">
                <span className="w-2 h-2 rounded-full bg-outline"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Shopping</span>
                <span className="text-outline-variant text-[10px]">•</span>
                <span className="font-label-sm text-label-sm text-outline">Oct 24</span>
              </div>
            </div>
          </div>
          <div className="font-num-md text-num-md text-on-surface text-right">
            -₹1,499.00
          </div>
        </div>
      </section>
    </div>
  )
}
