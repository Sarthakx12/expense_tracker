export default function BudgetsPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <header className="mb-8 md:mb-12">
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">Budgets</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Track your spending across categories.</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg pb-10">
        
        {/* Budget Card 1: Normal State */}
        <div className="bg-surface rounded-xl p-lg clay-raised flex flex-col gap-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center clay-sunken">
                <span className="material-symbols-outlined">restaurant</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Dining</h3>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">12 days left</span>
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="font-num-md text-num-md text-on-surface">$450 <span className="text-outline text-sm">/ $600</span></span>
              <span className="font-label-sm text-label-sm text-primary">75%</span>
            </div>
            <div className="h-3 w-full rounded-full clay-sunken bg-surface-container overflow-hidden">
              <div className="h-full rounded-full aurora-gradient w-[75%] transition-all duration-1000 ease-out"></div>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant text-sm">$150 remaining</p>
        </div>

        {/* Budget Card 2: Warning State (80%+) */}
        <div className="bg-surface rounded-xl p-lg clay-raised flex flex-col gap-md border border-[#F5A524]/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-[#F5A524]/10 text-[#F5A524] flex items-center justify-center clay-sunken">
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Groceries</h3>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">12 days left</span>
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="font-num-md text-num-md text-on-surface">$720 <span className="text-outline text-sm">/ $800</span></span>
              <span className="font-label-sm text-label-sm text-[#F5A524]">90%</span>
            </div>
            <div className="h-3 w-full rounded-full clay-sunken bg-surface-container overflow-hidden">
              <div className="h-full rounded-full bg-[#F5A524] w-[90%] transition-all duration-1000 ease-out shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"></div>
            </div>
          </div>
          <p className="font-body-md text-body-md text-[#F5A524] text-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">warning</span>
            Only $80 remaining
          </p>
        </div>

        {/* Budget Card 3: Over Budget (100%+) */}
        <div className="bg-surface rounded-xl p-lg clay-raised flex flex-col gap-md border border-error/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center clay-sunken">
                <span className="material-symbols-outlined">local_gas_station</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Transport</h3>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">12 days left</span>
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="font-num-md text-num-md text-error">$210 <span className="text-outline text-sm">/ $200</span></span>
              <span className="font-label-sm text-label-sm text-error">105%</span>
            </div>
            <div className="h-3 w-full rounded-full clay-sunken bg-surface-container overflow-hidden">
              <div className="h-full rounded-full bg-error w-full transition-all duration-1000 ease-out shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"></div>
            </div>
          </div>
          <p className="font-body-md text-body-md text-error text-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">error</span>
            $10 over budget
          </p>
        </div>

        {/* Add New Budget Card */}
        <button className="bg-surface-container-low rounded-xl p-lg clay-sunken flex flex-col items-center justify-center gap-md min-h-[200px] hover:bg-surface-container transition-colors group border-2 border-dashed border-outline-variant/50">
          <div className="w-12 h-12 rounded-full bg-surface clay-raised flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">add</span>
          </div>
          <span className="font-headline-md text-headline-md text-on-surface-variant group-hover:text-primary transition-colors">Create Budget</span>
        </button>

      </div>
    </div>
  )
}
