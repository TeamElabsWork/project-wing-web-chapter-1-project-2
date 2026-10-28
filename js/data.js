/**
 * KIIT SOCIETYDEX — DATA STORE (data.js)
 * Master array containing society information.
 * Populated and maintained by the assigned team members.
 */

const SOCIETY_DATA = [
  {
    id: "001",
    dexNumber: "#001",
    name: "Web Development Society (eLabs)",
    logoEmoji: "💻",
    types: ["Tech"],
    domain: "Coding",
    recruitmentStatus: "Recruiting",
    description: "The premier full-stack web and app engineering society of KIIT.",
    foundedYear: 2018,
    coordinator: "Ayush Sinha",
    stats: {
      activity: 95,
      events: 88,
      community: 92,
      innovation: 90,
      technicalSkill: 96
    },
    achievements: [
      "Built official campus platforms.",
      "National hackathon winners."
    ],
    events: ["DevHack", "Web Bootcamp"],
    contact: "elabs@kiit.ac.in",
    socialLinks: {
      github: "https://github.com/TeamElabsWork",
      instagram: "https://instagram.com/kiit_elabs"
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SOCIETY_DATA };
}
