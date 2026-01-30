'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Home, Percent, Calendar, DollarSign, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [currency, setCurrency] = useState('MAD');

  const calculations = useMemo(() => {
    const principal = propertyPrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const downPaymentAmount = propertyPrice * (downPayment / 100);

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      principal,
      downPaymentAmount
    };
  }, [propertyPrice, downPayment, loanTerm, interestRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <main className="min-h-screen bg-[#FDFCFA] pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Financial Tools
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            Mortgage Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Estimate your monthly payments and plan your budget with our easy-to-use calculator.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white border border-[#EDE9E3] p-6 lg:p-8">
              <h2 className="font-display text-2xl text-[#1A1A1A] mb-6 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-[#8B1538]" />
                Loan Details
              </h2>

              {/* Currency Toggle */}
              <div className="mb-6">
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                  Currency
                </label>
                <div className="flex gap-2">
                  {['MAD', 'EUR', 'USD'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        currency === c
                          ? 'bg-[#8B1538] text-white'
                          : 'bg-[#F8F6F3] text-[#4A4A4A] hover:bg-[#EDE9E3]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Price */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs tracking-wide uppercase text-[#7D8471] flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Property Price
                  </label>
                  <span className="font-display text-lg text-[#1A1A1A]">
                    {formatCurrency(propertyPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="20000000"
                  step="50000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-[#EDE9E3] appearance-none cursor-pointer accent-[#8B1538]"
                />
                <div className="flex justify-between text-xs text-[#7D8471] mt-1">
                  <span>{formatCurrency(100000)}</span>
                  <span>{formatCurrency(20000000)}</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs tracking-wide uppercase text-[#7D8471] flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Down Payment
                  </label>
                  <span className="font-display text-lg text-[#1A1A1A]">
                    {downPayment}% ({formatCurrency(calculations.downPaymentAmount)})
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-[#EDE9E3] appearance-none cursor-pointer accent-[#8B1538]"
                />
                <div className="flex justify-between text-xs text-[#7D8471] mt-1">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs tracking-wide uppercase text-[#7D8471] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Loan Term
                  </label>
                  <span className="font-display text-lg text-[#1A1A1A]">
                    {loanTerm} years
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-[#EDE9E3] appearance-none cursor-pointer accent-[#8B1538]"
                />
                <div className="flex justify-between text-xs text-[#7D8471] mt-1">
                  <span>5 years</span>
                  <span>30 years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs tracking-wide uppercase text-[#7D8471] flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Interest Rate
                  </label>
                  <span className="font-display text-lg text-[#1A1A1A]">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#EDE9E3] appearance-none cursor-pointer accent-[#8B1538]"
                />
                <div className="flex justify-between text-xs text-[#7D8471] mt-1">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>

              <div className="p-4 bg-[#8B1538]/5 border border-[#8B1538]/20 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#4A4A4A]">
                  This calculator provides estimates only. Actual rates and terms may vary. 
                  Contact us for personalized mortgage advice.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div>
              <div className="bg-[#1A1A1A] p-6 lg:p-8 mb-6">
                <h3 className="text-white/60 text-sm uppercase tracking-wide mb-2">Monthly Payment</h3>
                <p className="font-display text-4xl lg:text-5xl text-white">
                  {formatCurrency(calculations.monthlyPayment)}
                </p>
                <p className="text-white/40 text-sm mt-2">per month for {loanTerm} years</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-[#EDE9E3] p-5">
                  <p className="text-[#7D8471] text-sm mb-1">Loan Amount</p>
                  <p className="font-display text-xl text-[#1A1A1A]">
                    {formatCurrency(calculations.principal)}
                  </p>
                </div>
                <div className="bg-white border border-[#EDE9E3] p-5">
                  <p className="text-[#7D8471] text-sm mb-1">Down Payment</p>
                  <p className="font-display text-xl text-[#1A1A1A]">
                    {formatCurrency(calculations.downPaymentAmount)}
                  </p>
                </div>
                <div className="bg-white border border-[#EDE9E3] p-5">
                  <p className="text-[#7D8471] text-sm mb-1">Total Interest</p>
                  <p className="font-display text-xl text-[#8B1538]">
                    {formatCurrency(calculations.totalInterest)}
                  </p>
                </div>
                <div className="bg-white border border-[#EDE9E3] p-5">
                  <p className="text-[#7D8471] text-sm mb-1">Total Payment</p>
                  <p className="font-display text-xl text-[#1A1A1A]">
                    {formatCurrency(calculations.totalPayment)}
                  </p>
                </div>
              </div>

              {/* Payment Breakdown Visual */}
              <div className="bg-white border border-[#EDE9E3] p-6">
                <h3 className="font-display text-lg text-[#1A1A1A] mb-4">Payment Breakdown</h3>
                <div className="h-4 flex overflow-hidden mb-4">
                  <div 
                    className="bg-[#8B1538] h-full"
                    style={{ width: `${(calculations.principal / calculations.totalPayment) * 100}%` }}
                  />
                  <div 
                    className="bg-[#C4A35A] h-full"
                    style={{ width: `${(calculations.totalInterest / calculations.totalPayment) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#8B1538]" />
                    <span className="text-[#7D8471]">Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#C4A35A]" />
                    <span className="text-[#7D8471]">Interest</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="flex-1 py-4 bg-[#8B1538] text-white font-medium text-center hover:bg-[#6B0F2B] transition-colors"
                >
                  Get Pre-Approved
                </Link>
                <Link
                  href="/properties"
                  className="flex-1 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium text-center hover:bg-[#1A1A1A] hover:text-white transition-colors"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-[#F8F6F3] border-t border-[#EDE9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-[#1A1A1A] text-center mb-12">
            Tips for Getting the Best Mortgage Rate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Improve Your Credit Score',
                description: 'A higher credit score can help you qualify for lower interest rates and better loan terms.'
              },
              {
                title: 'Save for a Larger Down Payment',
                description: 'A larger down payment reduces your loan amount and can help you avoid additional insurance costs.'
              },
              {
                title: 'Compare Multiple Lenders',
                description: 'Shop around and compare offers from different banks and financial institutions.'
              }
            ].map((tip, idx) => (
              <div key={idx} className="bg-white border border-[#EDE9E3] p-6">
                <div className="w-10 h-10 bg-[#8B1538] text-white flex items-center justify-center font-display mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{tip.title}</h3>
                <p className="text-sm text-[#7D8471]">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
