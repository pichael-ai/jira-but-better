import React, { useState } from 'react'
import { 
  Layout, 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  Plus, 
  MoreHorizontal, 
  Bug, 
  User, 
  CheckSquare,
  ChevronDown,
  Filter,
  Share2,
  Zap,
  BarChart2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Sidebar = () => (
  <div className="w-16 hover:w-64 bg-jira-sidebar h-screen flex flex-col transition-all duration-300 overflow-hidden group fixed left-0 top-0 z-50 shadow-2xl">
    <div className="p-4 mb-4">
      <div className="w-8 h-8 bg-white rounded flex items-center justify-center shrink-0">
        <Zap className="text-jira-sidebar fill-jira-sidebar" size={20} />
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-2 px-3">
      {[
        { icon: Layout, label: 'Board' },
        { icon: CheckSquare, label: 'Backlog' },
        { icon: BarChart2, label: 'Reports' },
        { icon: Plus, label: 'Create' }
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-4 p-2 rounded hover:bg-white/10 text-white cursor-pointer transition-colors">
          <item.icon size={24} className="shrink-0" />
          <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{item.label}</span>
        </div>
      ))}
    </div>
    <div className="p-4 border-t border-white/10 text-white/50 flex flex-col gap-4 px-3">
      <Settings size={24} className="shrink-0" />
      <User size={24} className="shrink-0" />
    </div>
  </div>
)

const Card = ({ issue }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-3 rounded shadow-sm border border-transparent hover:border-jira-blue cursor-pointer group mb-2"
  >
    <div className="text-sm mb-3 group-hover:text-jira-blue transition-colors leading-snug">
      {issue.summary}
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {issue.type === 'bug' ? (
          <Bug size={14} className="text-red-500" />
        ) : (
          <CheckSquare size={14} className="text-blue-500" />
        )}
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{issue.key}</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-white" title={issue.assignee}>
          {issue.assignee.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
    </div>
  </motion.div>
)

const Column = ({ title, count, issues }) => (
  <div className="bg-[#f4f5f7] rounded-lg p-2 flex flex-col min-w-[280px] w-full">
    <div className="px-2 py-3 flex items-center justify-between mb-2">
      <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">{title} <span className="ml-1 text-slate-400 font-medium tracking-normal">{count}</span></h3>
      <button className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-500"><MoreHorizontal size={14}/></button>
    </div>
    <div className="flex-1">
      {issues.map((issue, i) => <Card key={i} issue={issue} />)}
    </div>
  </div>
)

function App() {
  const [data] = useState({
    todo: [
      { key: 'JBB-001', summary: 'Replace the ceiling light', type: 'bug', assignee: 'Aldo Delgado', priority: 'high' }
    ],
    inProgress: [],
    done: []
  })

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-16 bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">Projects / Jira But Better / Kanban</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" className="bg-slate-50 border border-slate-200 rounded pl-10 pr-4 py-1.5 text-sm w-48 focus:w-64 focus:bg-white transition-all outline-none" placeholder="Search" />
            </div>
            <Bell size={20} className="text-slate-500" />
            <HelpCircle size={20} className="text-slate-500" />
          </div>
        </header>

        {/* Board Header */}
        <div className="px-8 pt-8 pb-4 shrink-0">
          <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white">AD</div>
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold border-2 border-white text-slate-600">+1</div>
              </div>
              <div className="w-px h-8 bg-slate-200 mx-2" />
              <button className="flex items-center gap-1.5 text-slate-600 hover:bg-slate-100 px-2 py-1.5 rounded transition-colors text-[14px] font-medium">
                Only my issues
              </button>
              <button className="flex items-center gap-1.5 text-slate-600 hover:bg-slate-100 px-2 py-1.5 rounded transition-colors text-[14px] font-medium">
                Recently updated
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded transition-colors text-slate-600"><Share2 size={18}/></button>
              <button className="p-2 hover:bg-slate-100 rounded transition-colors text-slate-600"><Filter size={18}/></button>
            </div>
          </div>
        </div>

        {/* The Board */}
        <div className="flex-1 overflow-x-auto p-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full items-start">
            <Column title="To Do" count={data.todo.length} issues={data.todo} />
            <Column title="In Progress" count={data.inProgress.length} issues={data.inProgress} />
            <Column title="Done" count={data.done.length} issues={data.done} />
            <div className="hidden lg:flex flex-col min-w-[280px]">
               <div className="p-6 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2 grayscale hover:grayscale-0 hover:border-jira-blue hover:text-jira-blue transition-all cursor-pointer">
                  <Plus size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Add Column</span>
               </div>
            </div>
          </div>
        </div>

        {/* "Beast Mode" Features Footer */}
        <footer className="h-10 bg-jira-blue text-white flex items-center justify-between px-6 text-[10px] font-bold uppercase tracking-widest shrink-0">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Zap size={12} className="fill-white"/> Pichael Engine 5.2 Active</span>
            <span className="text-white/50">|</span>
            <span>Auto-Prioritization: ON</span>
          </div>
          <div className="flex gap-4">
            <span>By Pichael // Jira But Better v1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
