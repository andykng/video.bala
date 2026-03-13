/**
 * Root composition — assembles the 5 sequences with shared gold particles.
 *
 * Global frame timeline:
 *   0   – 119  → Seq1 Intro
 *   120 – 299  → Seq2 Révélation
 *   300 – 479  → Seq3 Date & Lieu
 *   480 – 719  → Seq4 Tickets.cg
 *   720 – 899  → Seq5 Call to Action
 *
 * Audio: add <Audio src={staticFile("voiceover.mp3")} /> below GoldParticles
 *        once the ElevenLabs export is placed in the /public folder.
 */
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { GoldParticles } from "./components/GoldParticles";
import { Seq1Intro } from "./sequences/Seq1Intro";
import { Seq2Revelation } from "./sequences/Seq2Revelation";
import { Seq3DateLieu } from "./sequences/Seq3DateLieu";
import { Seq4Tickets } from "./sequences/Seq4Tickets";
import { Seq5CTA } from "./sequences/Seq5CTA";
import {
  C,
  SEQ1_DUR,
  SEQ1_FROM,
  SEQ2_DUR,
  SEQ2_FROM,
  SEQ3_DUR,
  SEQ3_FROM,
  SEQ4_DUR,
  SEQ4_FROM,
  SEQ5_DUR,
  SEQ5_FROM,
} from "./constants";

export const BalaBalAwardsVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.noir }}>
      {/*
       * Gold particles live outside any Sequence so they use the
       * global frame and run continuously for the full 30 s.
       */}
      <GoldParticles count={100} seed={42} />

      {/* ── Sequence 1 — Intro choc */}
      <Sequence from={SEQ1_FROM} durationInFrames={SEQ1_DUR}>
        <Seq1Intro />
      </Sequence>

      {/* ── Sequence 2 — Révélation événement */}
      <Sequence from={SEQ2_FROM} durationInFrames={SEQ2_DUR}>
        <Seq2Revelation />
      </Sequence>

      {/* ── Sequence 3 — Date & Lieu */}
      <Sequence from={SEQ3_FROM} durationInFrames={SEQ3_DUR}>
        <Seq3DateLieu />
      </Sequence>

      {/* ── Sequence 4 — Tickets.CG spotlight */}
      <Sequence from={SEQ4_FROM} durationInFrames={SEQ4_DUR}>
        <Seq4Tickets />
      </Sequence>

      {/* ── Sequence 5 — Call to Action */}
      <Sequence from={SEQ5_FROM} durationInFrames={SEQ5_DUR}>
        <Seq5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
