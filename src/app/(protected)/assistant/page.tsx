export default function AssistantPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] w-full gap-lg bg-background">
      {/* Assistant History Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-full bg-surface-container-low rounded-3xl border border-outline-variant/30 clay-sunken p-4 gap-sm overflow-hidden flex-shrink-0">
        <div className="mb-md">
          <h2 className="font-headline-md text-[20px] font-bold text-primary">AI Assistant</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto space-y-1 pr-2">
          <div className="py-2">
            <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">Recent Chats</span>
          </div>
          
          <button className="w-full flex items-center px-3 py-2 bg-primary text-on-primary shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.2)] rounded-xl group text-left">
            <span className="material-symbols-outlined mr-sm icon-fill text-[18px]">chat_bubble</span>
            <span className="font-label-sm text-label-sm truncate">Portfolio Review</span>
          </button>
          
          <button className="w-full flex items-center px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-xl transition-colors group text-left">
            <span className="material-symbols-outlined mr-sm text-[18px]">chat_bubble_outline</span>
            <span className="font-label-sm text-label-sm truncate">Tax Harvesting Ideas</span>
          </button>
          
          <button className="w-full flex items-center px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-xl transition-colors group text-left">
            <span className="material-symbols-outlined mr-sm text-[18px]">chat_bubble_outline</span>
            <span className="font-label-sm text-label-sm truncate">Retirement Projection</span>
          </button>
        </nav>
        
        <div className="mt-auto pt-4">
          <button className="w-full flex items-center justify-center py-2 px-4 rounded-xl bg-surface clay-raised hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-primary">
            <span className="material-symbols-outlined mr-xs text-[18px]">add</span> New Chat
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative clay-raised rounded-3xl overflow-hidden bg-surface">
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 flex flex-col scroll-smooth">
          
          {/* AI Welcome Message */}
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-10 h-10 rounded-full bg-surface-container clay-sunken flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary icon-fill">smart_toy</span>
            </div>
            <div className="bg-surface clay-raised rounded-2xl rounded-tl-none p-4">
              <p className="font-body-md text-body-md text-on-surface">
                Hello! I'm your PaisaIQ AI assistant. How can I help you optimize your wealth today?
              </p>
            </div>
          </div>
          
          {/* User Message */}
          <div className="flex items-start gap-4 max-w-3xl self-end flex-row-reverse">
            <div className="w-10 h-10 rounded-full overflow-hidden clay-sunken flex-shrink-0 bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="aurora-gradient shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.8)] rounded-2xl rounded-tr-none p-4 text-on-primary">
              <p className="font-body-md text-body-md">
                Can you review my current asset allocation? I feel heavily weighted in tech.
              </p>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-10 h-10 rounded-full bg-surface-container clay-sunken flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary icon-fill">smart_toy</span>
            </div>
            <div className="bg-surface clay-insight rounded-2xl rounded-tl-none p-6 w-full">
              <div className="flex items-center gap-1 mb-2 text-primary">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span className="font-label-sm text-label-sm">Analyzing Portfolio Data...</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface mb-4">
                Looking at your linked accounts, you currently have <strong>42%</strong> of your total equity portfolio allocated to the Technology sector. This is noticeably higher than the S&P 500 benchmark weighting of ~29%.
              </p>
              
              <div className="bg-surface-container-low p-4 rounded-xl clay-sunken mb-4 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full border-4 border-surface-container-highest flex items-center justify-center relative">
                  <svg className="w-10 h-10 absolute -rotate-90" viewBox="0 0 36 36">
                    <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                    <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="42, 100" strokeWidth="4"></path>
                  </svg>
                  <span className="font-label-sm text-[10px] font-bold text-primary">42%</span>
                </div>
                <div>
                  <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Tech Allocation</p>
                  <p className="font-num-md text-body-md font-medium text-on-surface">$124,500.00</p>
                </div>
              </div>
              
              <p className="font-body-md text-body-md text-on-surface">
                Would you like me to suggest some rebalancing strategies to diversify into other sectors like Healthcare or Industrials?
              </p>
            </div>
          </div>

          <div className="h-24"></div> {/* Spacer for input */}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-surface via-surface to-transparent pt-12">
          <div className="w-full">
            {/* Suggested Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface clay-raised font-label-sm text-label-sm text-primary hover:bg-surface-variant transition-colors border border-transparent">
                Rebalance options
              </button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface clay-raised font-label-sm text-label-sm text-primary hover:bg-surface-variant transition-colors border border-transparent">
                Compare to benchmarks
              </button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface clay-raised font-label-sm text-label-sm text-primary hover:bg-surface-variant transition-colors border border-transparent">
                Tax implications
              </button>
            </div>
            
            {/* Input Box */}
            <div className="relative w-full rounded-2xl bg-surface-container clay-sunken aurora-border flex items-end p-1">
              <button className="p-2 text-outline hover:text-primary transition-colors mb-0.5 rounded-full hover:bg-surface-variant flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              <textarea 
                className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] py-2.5 px-2 font-body-md text-body-md text-on-surface placeholder:text-outline-variant outline-none" 
                placeholder="Ask anything about your money..." 
                rows={1} 
              />
              <button className="p-2 bg-primary text-on-primary rounded-xl clay-raised mb-0.5 ml-1 hover:opacity-90 transition-opacity flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined icon-fill text-[20px]">send</span>
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="font-label-sm text-[10px] text-outline-variant">AI can make mistakes. Verify important financial information.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
