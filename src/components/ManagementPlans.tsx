/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Cpu, Zap, Star, ShieldCheck, Gauge, Trophy } from 'lucide-react';
import { MANAGEMENT_PLANS } from '../data';

interface ManagementPlansProps {
  onSelectPlan: (planId: 'monthly' | 'quarterly') => void;
}

export default function ManagementPlans({ onSelectPlan }: ManagementPlansProps) {
  return (
    <div className="w-full text-white py-1.5" id="management-plans-panel">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
        
        {/* Monthly rolling */}
        <div className="glass-panel rounded-2xl p-6 lg:p-8 border-white/5 bg-neutral-950/60 relative overflow-hidden flex flex-col justify-between" id="mgmt-card-monthly">
          {/* Subtle decoration track */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/2.5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-3xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">Standard Option</span>
                <h3 className="text-xl font-display font-medium text-white">Monthly Rolling Package</h3>
              </div>
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/5">
                <Cpu className="w-5 h-5 text-neutral-400" />
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed mb-6">
              Cancel or change limits on a rolling credit basis. Excellent for young operators checking initial hospitality demand patterns before expanding site scope.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 mt-0.5 border border-white/5 shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div>
                  <span className="text-xs font-medium text-white block">Monthly Menu & Text Tweaks</span>
                  <span className="text-2xs text-neutral-500 leading-normal">Urgent item removals or text modifications.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 mt-0.5 border border-white/5 shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div>
                  <span className="text-xs font-medium text-white block">Continuous Server Health Checks</span>
                  <span className="text-2xs text-neutral-500 leading-normal">System monitoring to guarantee constant online status.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 mt-0.5 border border-white/5 shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div>
                  <span className="text-xs font-medium text-white block">Responsive Email Assistance</span>
                  <span className="text-2xs text-neutral-500 leading-normal">General assistance support tickets handled within 48h.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
            <div>
              <span className="text-3xs font-mono uppercase text-neutral-500 block">Commitment Rate:</span>
              <span className="text-lg font-mono text-white font-semibold">Month-to-Month</span>
            </div>

            <button
              onClick={() => onSelectPlan('monthly')}
              id="btn-select-management-monthly"
              className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 hover:bg-white/5 border border-white/10 text-xs font-mono font-bold rounded-lg text-neutral-300 hover:text-white transition-all text-center cursor-pointer select-none"
            >
              Configure in Builder
            </button>
          </div>
        </div>

        {/* 3-Month Management Plan */}
        <div className="glass-panel rounded-2xl p-6 lg:p-8 border-neon-purple/20 bg-gradient-to-b from-[#0e0a16] to-[#04020a] relative overflow-hidden flex flex-col justify-between" id="mgmt-card-quarterly">
          {/* Highlight decoration bubble */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-4xs font-mono uppercase tracking-widest px-2.5 py-0.5 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full inline-block mb-1.5">
                  Popular Value Plan
                </span>
                <h3 className="text-xl font-display font-medium text-white flex items-center gap-1.5">
                  3-Month Management Package
                </h3>
              </div>
              <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/30">
                <Zap className="w-5 h-5 text-neon-purple" />
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed mb-6">
              Guaranteed security updates, rapid support, and regular indexing optimizations for 90 days. Ideal for active, high-traffic business operations.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-neon-purple/15 flex items-center justify-center text-neon-purple mt-0.5 border border-neon-purple/30 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-white block">15% Direct Billing Reduction</span>
                  <span className="text-2xs text-neon-purple/80 leading-normal">Applied immediately to all ongoing monthly rates.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-neon-purple/15 flex items-center justify-center text-neon-purple mt-0.5 border border-neon-purple/30 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-white block">Priority Helpdesk Access (Under 12h)</span>
                  <span className="text-2xs text-neutral-300 leading-normal">Swift menu or aesthetic adjustments completed same day.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-neon-purple/15 flex items-center justify-center text-neon-purple mt-0.5 border border-neon-purple/30 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-white block">Monthly Comprehensive Audit</span>
                  <span className="text-2xs text-neutral-300 leading-normal">Optimization reports explaining client traffic and caching.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-neon-purple/15 flex items-center justify-center text-neon-purple mt-0.5 border border-neon-purple/30 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-white block">Persistent Page-Speed Testing</span>
                  <span className="text-2xs text-neutral-300 leading-normal">Dynamic code clean-ups so pages load swiftly on mobile.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
            <div>
              <span className="text-3xs font-mono uppercase text-neutral-400 block">Commitment Rate:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-mono text-white font-semibold">90 Days</span>
                <span className="text-3xs text-neon-purple font-mono uppercase">Saving 15%</span>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('quarterly')}
              id="btn-select-management-quarterly"
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs font-mono font-bold rounded-lg transition-all text-center cursor-pointer select-none hover:shadow-lg hover:shadow-neon-purple/10 border border-white/5 active:scale-95"
            >
              Equip & Configure
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
