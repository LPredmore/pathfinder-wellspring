import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const replacements = [
  {
    currentTitle: "Back-pay attorneys and accredited agents",
    title: "VA Accredited Attorneys",
    body: (
      <div className="space-y-5 text-[#111814]/72">
        <p>
          Veterans sometimes need legal representation. That does not make the payment structure any less backward.
        </p>
        <p>
          VA-accredited attorneys are commonly paid from the veteran&apos;s past-due benefits. The longer the case remains unresolved, the larger the potential backpay becomes—and the larger the fee may become with it. The veteran needs speed. The attorney&apos;s compensation can grow with delay. That is a fundamentally broken incentive.
        </p>
        <p>
          The industry often hides behind words like “thorough,” “complex,” and “strategic” while veterans spend months or years waiting for money, treatment access, housing stability, or basic financial relief. Some cases legitimately take time. But when delay increases the value of the attorney&apos;s fee, veterans have every right to question whether every month was truly necessary.
        </p>
        <p>
          A process that pays more when the veteran waits longer does not reward efficiency. It rewards a larger retroactive award. During that wait, veterans can lose homes, destroy credit, delay medical care, accumulate debt, and suffer damage that backpay cannot undo.
        </p>
        <p className="font-bold text-[#111814]">
          The veteran lives with the consequences while the backpay meter keeps running.
        </p>
      </div>
    ),
  },
  {
    currentTitle: "Rating-increase and claims-strategy companies",
    title: "Ratings Coaching Companies",
    body: (
      <div className="space-y-5 text-[#111814]/72">
        <p>
          Ratings coaching companies are often fast because they have turned the VA disability system into an optimization game.
        </p>
        <p>
          They study the rating schedule, identify the shortest path to a higher percentage, coach veterans on what language produces the desired result, and push claims through highly efficient, repeatable systems. Unlike backpay attorneys, they usually have no reason to delay. Their incentive is to get the largest possible increase as quickly as possible.
        </p>
        <p>That sounds helpful until you examine what they are actually paid to produce.</p>
        <p>
          When a company&apos;s fee increases with the veteran&apos;s rating, the goal can quietly shift from documenting the veteran&apos;s real condition to finding any available route to the target percentage. Veterans may be encouraged to exaggerate symptoms, claim conditions they do not truly have, or use one condition as a workaround because another legitimate condition was denied. The message becomes: “If VA will not pay you for what actually happened, we will find something else that gets you the same number.”
        </p>
        <p className="font-bold text-[#111814]">That is not advocacy. It is ratings engineering.</p>
        <p>
          The result is a cookie-cutter claim package built around compensation rather than clinical truth. These strategies may win quickly, but they can leave veterans exposed to reexaminations, denials, reductions, overpayments, fraud investigations, and clawbacks. The veteran carries that risk long after the coaching company collects its fee.
        </p>
        <p>
          The price can also be obscene. Companies may charge several multiples of the veteran&apos;s monthly increase, producing five-figure bills for education, templates, and coaching while the veteran still gathers the records, attends the examinations, completes the forms, and files the claim.
        </p>
        <p>
          These companies also damage veterans who never used them. Every exaggerated claim, scripted examination, and manufactured workaround gives VA another reason to increase scrutiny, add barriers, question legitimate symptoms, and treat honest veterans like suspected fraudsters.
        </p>
        <p className="font-bold text-[#111814]">
          They do not just play the game. They make the game harder for every veteran who comes next.
        </p>
      </div>
    ),
  },
  {
    currentTitle: "DBQ and Nexus-letter factories",
    title: "Nexus Letter Factories",
    body: (
      <div className="space-y-5 text-[#111814]/72">
        <p>
          A Nexus opinion is supposed to be an independent medical conclusion. Nexus Letter Factories turn it into a retail product.
        </p>
        <p>
          Their business model is simple: advertise a letter, schedule one brief appointment, review a packet of records, charge hundreds or thousands of dollars, and produce the document the veteran was told the claim needed. Many of these companies operate alongside ratings coaching businesses that identify the desired claim strategy and then send the veteran to a preferred medical provider to manufacture the supporting paperwork.
        </p>
        <p className="font-bold text-[#111814]">That is not a continuum of care. It is a document supply chain.</p>
        <p>
          The clinician often has no meaningful treatment relationship with the veteran, no responsibility for what happens after the letter is delivered, and no ongoing role when VA challenges the opinion. The company gets paid for producing the document—not for caring for the veteran, following the condition, defending weak reasoning, or correcting the record after a denial.
        </p>
        <p>
          Once the same providers repeatedly submit high-volume opinions based on one-time encounters, predictable templates, and predetermined claim strategies, credibility begins to collapse. VA adjudicators become more skeptical, private medical evidence receives more scrutiny, and veterans who paid for those opinions can find themselves facing another examination, another denial, another appeal, and another bill.
        </p>
        <p>
          The damage spreads beyond one claim. When factory-style medical evidence becomes associated with exaggeration, poor rationale, or questionable authenticity, legitimate private clinicians and honest veterans are forced to overcome the distrust those companies created.
        </p>
        <p>
          A medical opinion should follow the evidence. It should not begin with a customer purchasing the conclusion they were told they need.
        </p>
        <p className="font-bold text-[#111814]">
          A clinician who disappears after selling the letter was never responsible for the veteran—only the transaction.
        </p>
      </div>
    ),
  },
] as const;

type Mount = { host: HTMLElement; body: ReactNode };

function replaceTriggerLabel(trigger: HTMLButtonElement, title: string) {
  const textNode = Array.from(trigger.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (!textNode) return null;
  const original = textNode.nodeValue ?? "";
  textNode.nodeValue = title;
  return () => {
    textNode.nodeValue = original;
  };
}

export function OcsIndustryCopyEnhancements() {
  const [mounts, setMounts] = useState<Mount[]>([]);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const nextMounts: Mount[] = [];

    for (const replacement of replacements) {
      const trigger = Array.from(document.querySelectorAll<HTMLButtonElement>("button")).find(
        (button) => button.textContent?.trim() === replacement.currentTitle,
      );
      if (!trigger) continue;

      const restoreLabel = replaceTriggerLabel(trigger, replacement.title);
      if (restoreLabel) cleanups.push(restoreLabel);

      const item = trigger.parentElement?.parentElement;
      const content = item?.querySelector<HTMLElement>("[role=region]");
      const inner = content?.firstElementChild as HTMLElement | null;
      if (!content || !inner) continue;

      const originalDisplay = inner.style.display;
      inner.style.display = "none";

      const host = document.createElement("div");
      host.dataset.ocsIndustryCopy = replacement.title;
      host.className = "pb-7";
      content.appendChild(host);
      nextMounts.push({ host, body: replacement.body });

      cleanups.push(() => {
        inner.style.display = originalDisplay;
        host.remove();
      });
    }

    setMounts(nextMounts);

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
    };
  }, []);

  return <>{mounts.map(({ host, body }) => createPortal(body, host))}</>;
}
