(function(){
"use strict";
var DAY=86400000, MIN_EASE=1.3;

var MODULES=[
 {id:1,name:"Foundations & chemistry",ch:"OpenStax Ch. 1–2",hl:"#4E7CA8",hd:"#8FBBE0",
  blurb:"Body organization, homeostasis, and the chemistry everything downstream rests on. Skipping this is why the hard modules collapse later.",
  ess:[
   {t:"Homeostasis is the whole point",d:"Every system you'll study exists to keep internal conditions stable. When you meet a new organ, ask: <b>what variable is this defending?</b>"},
   {t:"Negative feedback reverses change",d:"Stimulus → receptor → control center → effector → response that <b>opposes</b> the original change. Nearly all physiology runs on this."},
   {t:"Positive feedback amplifies",d:"Rare, and used when you want a process to finish fast — childbirth contractions and blood clotting are the classic two."},
   {t:"Anatomical position is the reference",d:"All directional terms (superior, distal, medial) assume a body standing erect, palms forward. Learn it once and every description makes sense."},
   {t:"pH is a narrow window",d:"Blood sits at <b>7.35–7.45</b>. That tiny range is defended by buffers, lungs, and kidneys — you'll meet all three again in Module 8."},
   {t:"Four biomolecules, four jobs",d:"Carbohydrates (quick fuel), lipids (storage + membranes), proteins (structure + enzymes), nucleic acids (information)."}
  ]},
 {id:2,name:"Cells & tissues",ch:"OpenStax Ch. 3–4",hl:"#7E5AC4",hd:"#B79BF0",
  blurb:"How cells move things across membranes and how the four tissue types build every organ. Heavy on practicals.",
  ess:[
   {t:"The membrane is selectively permeable",d:"A phospholipid bilayer: lipid-soluble things slip through; water-soluble and charged things need channels or pumps."},
   {t:"Passive costs nothing, active costs ATP",d:"Diffusion, osmosis, and facilitated diffusion run down the gradient for free. Pumps (like Na⁺/K⁺ ATPase) push <b>against</b> it and burn ATP."},
   {t:"Osmosis follows solute",d:"Water moves toward the higher solute concentration. Hypotonic → cell swells; hypertonic → cell shrinks. This is IV fluid therapy in a nutshell."},
   {t:"Four tissue types, no exceptions",d:"Epithelial (covers/lines), connective (binds/supports, has a matrix), muscle (contracts), nervous (signals). Every organ is a mix of these."},
   {t:"Connective tissue is defined by its matrix",d:"Unlike the others, its cells sit scattered in extracellular material — which is why blood and bone both count as connective tissue."},
   {t:"Epithelium is avascular",d:"It has no blood supply of its own and depends on the connective tissue beneath — which is why it heals via diffusion and regenerates fast."}
  ]},
 {id:3,name:"Integumentary & skeletal",ch:"OpenStax Ch. 5–9",hl:"#A8823F",hd:"#DDB86B",
  blurb:"Skin, bone, and joints. The most memorization-dense stretch of A&P — draw and label relentlessly.",
  ess:[
   {t:"Skin is an organ with real jobs",d:"Protection, thermoregulation, sensation, vitamin D synthesis, and fluid retention. Burns kill largely by wrecking the last two."},
   {t:"Three layers, only two are skin",d:"Epidermis (avascular, keratinized), dermis (vessels, nerves, glands), then hypodermis — which is technically below the skin, storing fat."},
   {t:"Axial vs. appendicular",d:"Axial = skull, vertebral column, ribs (the body's core axis). Appendicular = limbs and the girdles that attach them. 206 bones total."},
   {t:"Bone is living, remodeling tissue",d:"<b>Osteoblasts build, osteoclasts chew.</b> Balance shifts with hormones, weight-bearing, and age — the whole story behind osteoporosis."},
   {t:"Bone is the calcium bank",d:"It stores ~99% of body calcium and releases it on hormonal demand, which is why calcium balance and bone health are inseparable."},
   {t:"Joints classify by movement",d:"Synarthrosis (immovable, e.g. skull sutures), amphiarthrosis (slightly, e.g. vertebral discs), diarthrosis (freely, all synovial joints)."}
  ]},
 {id:4,name:"Muscular system",ch:"OpenStax Ch. 10–11",hl:"#C86A3C",hd:"#F0996A",
  blurb:"How a muscle actually shortens — the single most satisfying mechanism in A&P, and a guaranteed exam question.",
  ess:[
   {t:"Three muscle types",d:"Skeletal (voluntary, striated), cardiac (involuntary, striated, intercalated discs), smooth (involuntary, not striated)."},
   {t:"Sliding filament, not shrinking filament",d:"Myosin heads grab actin and pull it toward the sarcomere's center. The filaments <b>slide past each other</b> — neither one shortens."},
   {t:"Calcium is the switch",d:"Ca²⁺ binds troponin → tropomyosin shifts → actin binding sites exposed → cross-bridges form. No calcium, no contraction."},
   {t:"ACh starts it at the NMJ",d:"Acetylcholine crosses the neuromuscular junction, depolarizes the muscle fiber, and triggers Ca²⁺ release from the sarcoplasmic reticulum."},
   {t:"ATP does double duty",d:"It powers the power stroke <b>and</b> is required to release myosin from actin — which is exactly why rigor mortis happens when ATP runs out."},
   {t:"Muscles work in pairs",d:"The agonist (prime mover) produces the action; the antagonist opposes it. Nothing pushes — muscles only pull."}
  ]},
 {id:5,name:"Nervous system",ch:"OpenStax Ch. 12–16",hl:"#2FA0A8",hd:"#5FD2DA",
  blurb:"The beast of A&P I and the most clinically loaded module — most drugs you'll ever give act somewhere in here. Give it extra weeks.",
  ess:[
   {t:"CNS vs. PNS",d:"CNS = brain + spinal cord (integration). PNS = everything else (sensory in, motor out). PNS motor splits into somatic (voluntary) and autonomic."},
   {t:"Resting potential is a stored battery",d:"About <b>−70 mV</b>: K⁺ high inside, Na⁺ high outside, maintained by the Na⁺/K⁺ pump. The neuron is charged and waiting."},
   {t:"The action potential is all-or-none",d:"Reach threshold and it fires fully; miss threshold and nothing happens. Strength is coded by <b>frequency</b>, not size."},
   {t:"Depolarize, repolarize, overshoot",d:"Na⁺ rushes in (depolarization) → Na⁺ channels close and K⁺ exits (repolarization) → brief hyperpolarization → pump restores rest."},
   {t:"Myelin buys speed",d:"Saltatory conduction jumps the impulse node to node. Oligodendrocytes myelinate in the CNS, Schwann cells in the PNS — MS destroys the former."},
   {t:"Sympathetic vs. parasympathetic",d:"Sympathetic = fight or flight (↑HR, dilated pupils, shunts blood to muscle). Parasympathetic = rest and digest (↓HR, digestion on). Nearly every organ gets both."},
   {t:"Synapses are chemical gaps",d:"The signal converts from electrical to chemical (neurotransmitter) and back. That gap is where virtually every psychoactive and cardiac drug intervenes."}
  ]},
 {id:6,name:"Endocrine system",ch:"OpenStax Ch. 17",hl:"#C4569C",hd:"#EC8FC6",
  blurb:"A short chapter with an enormous clinical payoff — diabetes and thyroid disease alone are a huge slice of real nursing.",
  ess:[
   {t:"Endocrine is slow and broad",d:"Hormones travel in blood to distant targets: slower onset than nerves, but longer-lasting and body-wide. Exocrine glands use ducts instead."},
   {t:"Hypothalamus rules the pituitary",d:"The 'master gland' is itself mastered — the hypothalamus links the nervous and endocrine systems and drives pituitary output."},
   {t:"Insulin and glucagon are opposites",d:"Insulin (beta cells) <b>lowers</b> blood glucose by driving it into cells. Glucagon (alpha cells) <b>raises</b> it. Diabetes is this axis failing."},
   {t:"Thyroid sets metabolic pace",d:"T3/T4 raise metabolic rate; calcitonin lowers blood calcium. Hyper- vs. hypothyroid symptoms are just 'too fast' vs. 'too slow.'"},
   {t:"Target cells need receptors",d:"A hormone floods the whole body but only affects cells carrying its receptor — which is why one signal produces specific effects."},
   {t:"Negative feedback again",d:"Rising thyroid hormone shuts off TSH. Nearly every endocrine axis self-regulates this way — find the loop and the disorder explains itself."}
  ]},
 {id:7,name:"Blood, heart & circulation",ch:"OpenStax Ch. 18–21",hl:"#B03A57",hd:"#EC7A94",
  blurb:"Start of A&P II. Behind every set of vitals, every IV, and the basics of reading a rhythm strip.",
  ess:[
   {t:"Blood is connective tissue",d:"Formed elements (RBCs, WBCs, platelets) suspended in plasma matrix. RBCs carry O₂, WBCs defend, platelets clot."},
   {t:"Hemoglobin is the oxygen truck",d:"Four iron-containing sites per molecule. Low hemoglobin = low oxygen delivery no matter how well the lungs work — that's anemia."},
   {t:"Two circuits, one pump",d:"Pulmonary: right heart → lungs → back. Systemic: left heart → body → back. The left ventricle is thickest because it pushes the whole body."},
   {t:"The path, memorized cold",d:"RA → tricuspid → RV → pulmonary valve → lungs → LA → mitral → LV → aortic valve → aorta. Valves keep it one-way."},
   {t:"The heart fires itself",d:"SA node (pacemaker) → AV node (delays) → bundle of His → Purkinje fibers. This intrinsic conduction is what an ECG actually records."},
   {t:"Arteries away, veins toward",d:"Arteries are thick and elastic to handle pressure; veins are thin with <b>valves</b> and rely on muscle pumping — which is why clots and varicosities are venous problems."},
   {t:"Lymphatics return the leak",d:"Capillaries leak fluid into tissue; the lymphatic system collects it, filters it through nodes, and returns it to the bloodstream."}
  ]},
 {id:8,name:"Respiratory, renal & acid–base",ch:"OpenStax Ch. 22–28",hl:"#4F9E5C",hd:"#7FD08C",
  blurb:"The A&P II gauntlet. Kidneys and acid–base are the hardest topics in the course and the most clinically central — slow way down here.",
  ess:[
   {t:"Gas exchange happens at alveoli",d:"Thin, wet, enormous surface area against capillaries. Everything upstream (nose to bronchioles) is just plumbing that conditions the air."},
   {t:"Breathing is a pressure trick",d:"The diaphragm drops → thoracic volume rises → pressure falls → air flows in. Exhaling at rest is passive elastic recoil."},
   {t:"The nephron is the functional unit",d:"~1 million per kidney. <b>Filter everything, then reclaim what you need.</b> That's the entire strategy."},
   {t:"Three renal processes",d:"Filtration (glomerulus pushes fluid out of blood), reabsorption (tubules take back water, glucose, ions), secretion (actively dumps extra waste in)."},
   {t:"Kidneys do far more than urine",d:"They regulate blood pressure (renin), red cell production (erythropoietin), calcium (vitamin D activation), and acid–base balance."},
   {t:"Two systems defend pH",d:"Lungs adjust CO₂ in <b>minutes</b>; kidneys adjust bicarbonate over <b>hours to days</b>. Buffers hold the line in between."},
   {t:"Respiratory vs. metabolic",d:"If the problem is CO₂, it's respiratory. If it's bicarbonate or fixed acid, it's metabolic. Then ask whether the other system is compensating."},
   {t:"Absorption is the small intestine's job",d:"The stomach mostly stores and breaks down; villi and microvilli in the small intestine do the actual nutrient absorption. The large intestine reclaims water."}
  ]}
];

var CARDS=[
 // ---------- M1 Foundations & chemistry ----------
 {id:"m1-1",m:1,q:"Define homeostasis.",a:"The maintenance of a stable internal environment within narrow limits despite changing external conditions."},
 {id:"m1-2",m:1,q:"Name the five components of a feedback loop, in order.",a:"Stimulus → receptor → control center → effector → response."},
 {id:"m1-3",m:1,q:"How does negative feedback differ from positive feedback?",a:"Negative feedback reverses the change and restores the set point; positive feedback amplifies the change until an endpoint is reached."},
 {id:"m1-4",m:1,q:"Give the two classic examples of positive feedback in the body.",a:"Labor contractions (oxytocin) and blood clotting."},
 {id:"m1-5",m:1,q:"Describe standard anatomical position.",a:"Standing erect, facing forward, arms at the sides, palms facing forward, feet flat."},
 {id:"m1-6",m:1,q:"Superior vs. inferior; proximal vs. distal.",a:"Superior = toward the head, inferior = toward the feet. Proximal = nearer the trunk/point of attachment, distal = farther from it."},
 {id:"m1-7",m:1,q:"Anatomy vs. physiology?",a:"Anatomy is the study of structure; physiology is the study of function."},
 {id:"m1-8",m:1,q:"List the levels of structural organization from smallest to largest.",a:"Chemical → cellular → tissue → organ → organ system → organism."},
 {id:"m1-9",m:1,q:"The four most abundant elements in the human body?",a:"Oxygen, carbon, hydrogen, and nitrogen (about 96% of body mass)."},
 {id:"m1-10",m:1,q:"What is an ion, and what is an electrolyte?",a:"An ion is an atom or group with a net charge from gaining/losing electrons; an electrolyte is a substance that separates into ions in solution and conducts electricity."},
 {id:"m1-11",m:1,q:"Ionic vs. covalent bond?",a:"Ionic bonds transfer electrons (creating charged ions that attract); covalent bonds share electrons between atoms."},
 {id:"m1-12",m:1,q:"Why is water called the universal solvent?",a:"It is polar, so it surrounds and dissolves other polar and charged (hydrophilic) substances."},
 {id:"m1-13",m:1,q:"Normal pH of arterial blood, and what happens below or above it?",a:"7.35–7.45. Below 7.35 is acidosis; above 7.45 is alkalosis."},
 {id:"m1-14",m:1,q:"What does a buffer do?",a:"Resists changes in pH by accepting or releasing hydrogen ions as needed."},
 {id:"m1-15",m:1,q:"Name the four major classes of biomolecules and one role of each.",a:"Carbohydrates (fuel), lipids (energy storage and membranes), proteins (structure and enzymes), nucleic acids (genetic information)."},
 {id:"m1-16",m:1,q:"What is metabolism, and its two divisions?",a:"All chemical reactions in the body: catabolism (breaking down, releasing energy) and anabolism (building up, requiring energy)."},
 {id:"m1-17",m:1,q:"Name the two major body cavities and a key organ in each.",a:"Dorsal cavity (brain, spinal cord) and ventral cavity (thoracic: heart and lungs; abdominopelvic: digestive organs)."},

 // ---------- M2 Cells & tissues ----------
 {id:"m2-1",m:2,q:"What is the main function of the plasma membrane?",a:"To act as a selectively permeable barrier controlling what enters and leaves the cell."},
 {id:"m2-2",m:2,q:"Describe the structure of the plasma membrane.",a:"A phospholipid bilayer with hydrophilic heads facing outward and hydrophobic tails inward, studded with proteins, cholesterol, and carbohydrates."},
 {id:"m2-3",m:2,q:"Passive vs. active transport?",a:"Passive requires no ATP and moves substances down their concentration gradient; active requires ATP to move them against the gradient."},
 {id:"m2-4",m:2,q:"Name three forms of passive transport.",a:"Simple diffusion, facilitated diffusion, and osmosis (filtration also counts)."},
 {id:"m2-5",m:2,q:"Define osmosis.",a:"The diffusion of water across a selectively permeable membrane toward the area of higher solute concentration."},
 {id:"m2-6",m:2,q:"What does the sodium–potassium pump do, and why does it matter?",a:"It pumps 3 Na⁺ out and 2 K⁺ in using ATP, maintaining the gradients that create the resting membrane potential."},
 {id:"m2-7",m:2,q:"Effect of a hypotonic solution on a cell?",a:"Water moves into the cell — it swells and may lyse (burst)."},
 {id:"m2-8",m:2,q:"Effect of a hypertonic solution on a cell?",a:"Water moves out of the cell — it shrinks (crenates)."},
 {id:"m2-9",m:2,q:"What is an isotonic solution, and name a clinical example.",a:"One with the same solute concentration as the cell, so there is no net water movement — e.g. 0.9% normal saline."},
 {id:"m2-10",m:2,q:"Which organelle produces ATP, and by what process?",a:"The mitochondrion, via cellular respiration (aerobic metabolism)."},
 {id:"m2-11",m:2,q:"Function of the ribosome?",a:"Protein synthesis — it translates mRNA into a chain of amino acids."},
 {id:"m2-12",m:2,q:"Rough vs. smooth endoplasmic reticulum?",a:"Rough ER has ribosomes and makes/processes proteins; smooth ER makes lipids, stores calcium, and detoxifies."},
 {id:"m2-13",m:2,q:"Function of the Golgi apparatus?",a:"Modifies, sorts, and packages proteins from the ER into vesicles for delivery."},
 {id:"m2-14",m:2,q:"What do lysosomes do?",a:"Contain digestive enzymes that break down worn organelles, debris, and engulfed pathogens."},
 {id:"m2-15",m:2,q:"Name the four primary tissue types.",a:"Epithelial, connective, muscle, and nervous tissue."},
 {id:"m2-16",m:2,q:"General functions of epithelial tissue?",a:"Covering and lining surfaces, protection, absorption, secretion, filtration, and sensation."},
 {id:"m2-17",m:2,q:"Why is epithelium described as avascular, and what follows from that?",a:"It has no blood vessels of its own; it depends on diffusion from the underlying connective tissue for nutrients."},
 {id:"m2-18",m:2,q:"What distinguishes connective tissue from all other tissue types?",a:"An abundant extracellular matrix in which its cells are scattered — which is why blood, bone, and fat all qualify."},
 {id:"m2-19",m:2,q:"Name four examples of connective tissue.",a:"Bone, cartilage, adipose (fat), blood, tendons, and ligaments (any four)."},
 {id:"m2-20",m:2,q:"What are the stages of mitosis, in order?",a:"Prophase, metaphase, anaphase, telophase (followed by cytokinesis)."},

 // ---------- M3 Integumentary & skeletal ----------
 {id:"m3-1",m:3,q:"Name the layers of the skin from superficial to deep.",a:"Epidermis, dermis, then hypodermis (subcutaneous layer, technically below the skin)."},
 {id:"m3-2",m:3,q:"Which skin layer is avascular, and which contains the blood vessels and nerves?",a:"The epidermis is avascular; the dermis contains blood vessels, nerves, glands, and hair follicles."},
 {id:"m3-3",m:3,q:"List five functions of the skin.",a:"Protection, thermoregulation, sensation, vitamin D synthesis, and prevention of fluid loss."},
 {id:"m3-4",m:3,q:"What pigment gives skin its color and protects against UV?",a:"Melanin, produced by melanocytes."},
 {id:"m3-5",m:3,q:"What protein makes the epidermis tough and waterproof?",a:"Keratin."},
 {id:"m3-6",m:3,q:"How does the skin cool the body?",a:"Sweat evaporation and vasodilation of dermal blood vessels, which releases heat at the surface."},
 {id:"m3-7",m:3,q:"How many bones are in the adult human skeleton?",a:"206."},
 {id:"m3-8",m:3,q:"Name the two divisions of the skeleton and what belongs to each.",a:"Axial (skull, vertebral column, ribs, sternum) and appendicular (limbs plus the pectoral and pelvic girdles)."},
 {id:"m3-9",m:3,q:"List five functions of the skeletal system.",a:"Support, protection, movement (levers for muscles), mineral storage (calcium), and blood cell production (hematopoiesis)."},
 {id:"m3-10",m:3,q:"Which cells build bone and which break it down?",a:"Osteoblasts build (deposit) bone; osteoclasts resorb (break down) bone. Osteocytes are mature maintaining cells."},
 {id:"m3-11",m:3,q:"Where does blood cell production occur?",a:"In red bone marrow (hematopoiesis)."},
 {id:"m3-12",m:3,q:"Compact vs. spongy bone?",a:"Compact bone is dense and forms the outer shell for strength; spongy (cancellous) bone is porous, lighter, and houses marrow."},
 {id:"m3-13",m:3,q:"Which mineral is stored in bone, and in what form?",a:"Calcium, stored mainly as calcium phosphate — bone holds about 99% of the body's calcium."},
 {id:"m3-14",m:3,q:"Classify joints by degree of movement.",a:"Synarthrosis (immovable, e.g. skull sutures), amphiarthrosis (slightly movable, e.g. intervertebral discs), diarthrosis (freely movable, all synovial joints)."},
 {id:"m3-15",m:3,q:"What defines a synovial joint?",a:"A fluid-filled joint cavity with articular cartilage, a capsule, and synovial fluid for lubrication — allowing free movement."},
 {id:"m3-16",m:3,q:"Ligament vs. tendon?",a:"Ligaments connect bone to bone; tendons connect muscle to bone."},
 {id:"m3-17",m:3,q:"Name the regions of the vertebral column and their vertebra counts.",a:"Cervical 7, thoracic 12, lumbar 5, sacrum 5 fused, coccyx 4 fused."},
 {id:"m3-18",m:3,q:"Name the bones of the upper limb from shoulder to wrist.",a:"Humerus, then radius (thumb side) and ulna (pinky side), then the carpals."},
 {id:"m3-19",m:3,q:"Name the bones of the lower limb from hip to ankle.",a:"Femur, patella, then tibia (weight-bearing, medial) and fibula (lateral), then the tarsals."},
 {id:"m3-20",m:3,q:"What is osteoporosis in terms of bone cell activity?",a:"Osteoclast resorption outpaces osteoblast formation, so bone density falls and fracture risk rises."},

 // ---------- M4 Muscular ----------
 {id:"m4-1",m:4,q:"Name the three types of muscle tissue and whether each is voluntary.",a:"Skeletal (voluntary, striated), cardiac (involuntary, striated), smooth (involuntary, non-striated)."},
 {id:"m4-2",m:4,q:"What structural feature is unique to cardiac muscle?",a:"Intercalated discs, which electrically couple cells so the heart contracts as a unit."},
 {id:"m4-3",m:4,q:"State the sliding filament theory.",a:"Myosin heads bind actin and pull it toward the center of the sarcomere, so the filaments slide past each other and the sarcomere shortens — the filaments themselves do not shorten."},
 {id:"m4-4",m:4,q:"What is a sarcomere?",a:"The functional contractile unit of a muscle fiber, running from one Z-disc to the next."},
 {id:"m4-5",m:4,q:"Which is the thick filament and which the thin?",a:"Myosin is the thick filament; actin is the thin filament."},
 {id:"m4-6",m:4,q:"What role does calcium play in contraction?",a:"Ca²⁺ binds troponin, shifting tropomyosin off the actin binding sites so myosin cross-bridges can attach."},
 {id:"m4-7",m:4,q:"Where is calcium stored inside a muscle fiber?",a:"In the sarcoplasmic reticulum."},
 {id:"m4-8",m:4,q:"Which neurotransmitter is released at the neuromuscular junction?",a:"Acetylcholine (ACh)."},
 {id:"m4-9",m:4,q:"Describe the two jobs of ATP in muscle contraction.",a:"It powers the myosin power stroke, and it is required to detach myosin from actin so the cycle can repeat."},
 {id:"m4-10",m:4,q:"Why does rigor mortis occur?",a:"Without ATP, myosin cannot release from actin, so cross-bridges stay locked and the muscle stays rigid."},
 {id:"m4-11",m:4,q:"Agonist vs. antagonist muscle?",a:"The agonist (prime mover) produces the desired action; the antagonist opposes or reverses it."},
 {id:"m4-12",m:4,q:"What is a motor unit?",a:"One motor neuron and all the muscle fibers it innervates — the smallest unit of contraction the nervous system can control."},
 {id:"m4-13",m:4,q:"Isotonic vs. isometric contraction?",a:"Isotonic: the muscle changes length and moves a load. Isometric: tension rises but length stays the same (e.g. holding a plank)."},
 {id:"m4-14",m:4,q:"What fuels muscle when oxygen is scarce, and what byproduct builds up?",a:"Anaerobic glycolysis; it produces lactic acid (lactate) and causes oxygen debt."},
 {id:"m4-15",m:4,q:"What is muscle tone?",a:"A continuous, low-level state of partial contraction that keeps muscles firm and ready without producing movement."},
 {id:"m4-16",m:4,q:"Origin vs. insertion of a muscle?",a:"The origin is the attachment to the stationary bone; the insertion is the attachment to the bone that moves."},
 {id:"m4-17",m:4,q:"Name the main muscle of inspiration and its innervation.",a:"The diaphragm, innervated by the phrenic nerve (C3–C5)."},
 {id:"m4-18",m:4,q:"Which muscle group is a common IM injection site, and why?",a:"The deltoid (and vastus lateralis / ventrogluteal) — thick muscle mass away from major nerves and vessels."},

 // ---------- M5 Nervous ----------
 {id:"m5-1",m:5,q:"Name the two principal cell types of nervous tissue and their roles.",a:"Neurons (transmit signals) and neuroglia/glial cells (support, insulate, nourish, and protect neurons)."},
 {id:"m5-2",m:5,q:"Name the structural divisions of the nervous system.",a:"Central nervous system (brain and spinal cord) and peripheral nervous system (all nerves outside the CNS)."},
 {id:"m5-3",m:5,q:"How does the PNS divide functionally?",a:"Sensory (afferent) carries signals to the CNS; motor (efferent) carries signals out, splitting into somatic (voluntary) and autonomic (involuntary)."},
 {id:"m5-4",m:5,q:"Label the parts of a neuron and their function.",a:"Dendrites receive signals; the cell body integrates them; the axon conducts the impulse away; axon terminals release neurotransmitter."},
 {id:"m5-5",m:5,q:"What is the approximate resting membrane potential, and what maintains it?",a:"About −70 mV, maintained by the Na⁺/K⁺ pump plus membrane permeability — K⁺ high inside, Na⁺ high outside."},
 {id:"m5-6",m:5,q:"What does 'all-or-none' mean for an action potential?",a:"If threshold is reached the impulse fires at full strength; if not, nothing fires. Stimulus intensity is coded by firing frequency, not amplitude."},
 {id:"m5-7",m:5,q:"Describe the phases of an action potential.",a:"Depolarization (Na⁺ channels open, Na⁺ rushes in), repolarization (Na⁺ closes, K⁺ exits), hyperpolarization (brief overshoot), then return to resting potential."},
 {id:"m5-8",m:5,q:"What is threshold potential?",a:"The membrane voltage (about −55 mV) that must be reached to trigger an action potential."},
 {id:"m5-9",m:5,q:"What is the refractory period?",a:"A brief interval after an action potential when the neuron cannot (absolute) or can barely (relative) fire again — it ensures one-way conduction."},
 {id:"m5-10",m:5,q:"What is myelin and what does it do?",a:"A fatty insulating sheath around axons that dramatically speeds impulse conduction."},
 {id:"m5-11",m:5,q:"Which cells make myelin in the CNS vs. the PNS?",a:"Oligodendrocytes in the CNS; Schwann cells in the PNS."},
 {id:"m5-12",m:5,q:"What is saltatory conduction?",a:"The impulse jumps from one node of Ranvier to the next along a myelinated axon, greatly increasing speed."},
 {id:"m5-13",m:5,q:"What is a synapse?",a:"The junction where a neuron communicates with another cell, usually by releasing neurotransmitter across a small gap."},
 {id:"m5-14",m:5,q:"Name four important neurotransmitters and a role for each.",a:"Acetylcholine (muscle contraction), dopamine (reward, movement), serotonin (mood, sleep), norepinephrine (arousal, fight-or-flight). GABA is the main inhibitory one."},
 {id:"m5-15",m:5,q:"Name the four lobes of the cerebrum and one function of each.",a:"Frontal (movement, judgment, personality), parietal (touch and spatial sense), temporal (hearing, memory), occipital (vision)."},
 {id:"m5-16",m:5,q:"What does the cerebellum do?",a:"Coordinates balance, posture, and smooth voluntary movement."},
 {id:"m5-17",m:5,q:"Name the parts of the brainstem and why it is vital.",a:"Midbrain, pons, and medulla oblongata — the medulla controls heart rate, breathing, and blood pressure."},
 {id:"m5-18",m:5,q:"What is the role of the hypothalamus?",a:"Maintains homeostasis — temperature, hunger, thirst, sleep cycles — and links the nervous system to the endocrine system via the pituitary."},
 {id:"m5-19",m:5,q:"What does the thalamus do?",a:"Acts as the relay station that routes nearly all sensory input to the appropriate area of the cerebral cortex."},
 {id:"m5-20",m:5,q:"Name the meninges from outermost to innermost.",a:"Dura mater, arachnoid mater, pia mater."},
 {id:"m5-21",m:5,q:"What are the functions of cerebrospinal fluid?",a:"Cushions the brain and spinal cord, provides buoyancy, and delivers nutrients while removing waste."},
 {id:"m5-22",m:5,q:"Compare sympathetic and parasympathetic effects on the body.",a:"Sympathetic (fight or flight): ↑heart rate, dilated pupils and airways, blood shunted to muscle, digestion slowed. Parasympathetic (rest and digest): ↓heart rate, constricted pupils, digestion stimulated."},
 {id:"m5-23",m:5,q:"Which neurotransmitter dominates the parasympathetic system, and which the sympathetic at target organs?",a:"Acetylcholine for parasympathetic; norepinephrine for most sympathetic target organs."},
 {id:"m5-24",m:5,q:"What is a reflex arc, and why does it bypass the brain?",a:"Receptor → sensory neuron → integration center in the spinal cord → motor neuron → effector. Bypassing the brain makes the response much faster."},
 {id:"m5-25",m:5,q:"Gray matter vs. white matter?",a:"Gray matter is mostly cell bodies and unmyelinated fibers (processing); white matter is myelinated axons (transmission)."},
 {id:"m5-26",m:5,q:"How many pairs of spinal nerves and cranial nerves are there?",a:"31 pairs of spinal nerves and 12 pairs of cranial nerves."},
 {id:"m5-27",m:5,q:"What is the blood–brain barrier?",a:"Tight junctions between capillary cells in the brain that restrict what can pass from blood into brain tissue — protective, but it also blocks many drugs."},
 {id:"m5-28",m:5,q:"Why does multiple sclerosis cause neurological deficits?",a:"It destroys myelin in the CNS, slowing or blocking conduction along affected axons."},

 // ---------- M6 Endocrine ----------
 {id:"m6-1",m:6,q:"Endocrine vs. exocrine gland?",a:"Endocrine glands are ductless and secrete hormones into the bloodstream; exocrine glands secrete through ducts onto a surface or into a cavity."},
 {id:"m6-2",m:6,q:"Compare nervous and endocrine control.",a:"Nervous control is fast, brief, and targeted; endocrine control is slower in onset, longer lasting, and body-wide."},
 {id:"m6-3",m:6,q:"Why does a hormone affect only certain cells?",a:"Only target cells carry the specific receptor for that hormone."},
 {id:"m6-4",m:6,q:"Which gland is called the master gland, and what controls it?",a:"The pituitary; it is controlled by the hypothalamus."},
 {id:"m6-5",m:6,q:"Name key hormones of the anterior pituitary.",a:"Growth hormone (GH), TSH, ACTH, FSH, LH, and prolactin."},
 {id:"m6-6",m:6,q:"Which two hormones are released by the posterior pituitary?",a:"ADH (vasopressin) and oxytocin — both actually made in the hypothalamus."},
 {id:"m6-7",m:6,q:"What does ADH do?",a:"Causes the kidneys to reabsorb water, concentrating urine and raising blood volume/pressure."},
 {id:"m6-8",m:6,q:"Which hormone lowers blood glucose, and from which cells?",a:"Insulin, from the beta cells of the pancreatic islets."},
 {id:"m6-9",m:6,q:"Which hormone raises blood glucose, and from which cells?",a:"Glucagon, from the alpha cells of the pancreatic islets."},
 {id:"m6-10",m:6,q:"Name the thyroid hormones and their principal effect.",a:"T3 (triiodothyronine) and T4 (thyroxine); they raise the body's metabolic rate. Calcitonin, also from the thyroid, lowers blood calcium."},
 {id:"m6-11",m:6,q:"What does parathyroid hormone (PTH) do?",a:"Raises blood calcium by increasing bone resorption, kidney reabsorption, and vitamin D activation — the opposite of calcitonin."},
 {id:"m6-12",m:6,q:"What does cortisol do, and where is it made?",a:"Made in the adrenal cortex; it raises blood glucose, suppresses inflammation and immunity, and supports the long-term stress response."},
 {id:"m6-13",m:6,q:"What does aldosterone regulate?",a:"Sodium and water retention (and potassium excretion) by the kidneys, raising blood volume and pressure."},
 {id:"m6-14",m:6,q:"What do epinephrine and norepinephrine do, and where are they released?",a:"Released by the adrenal medulla; they produce the rapid fight-or-flight response — ↑heart rate, ↑blood glucose, bronchodilation."},
 {id:"m6-15",m:6,q:"Explain endocrine negative feedback with a thyroid example.",a:"Low thyroid hormone → hypothalamus releases TRH → pituitary releases TSH → thyroid releases T3/T4 → rising T3/T4 inhibits TRH and TSH."},
 {id:"m6-16",m:6,q:"Physiologically, what is diabetes mellitus?",a:"A failure of insulin production (type 1) or insulin effectiveness at target cells (type 2), so glucose stays in the blood instead of entering cells."},

 // ---------- M7 Blood, heart & circulation ----------
 {id:"m7-1",m:7,q:"Name the formed elements of blood and their functions.",a:"Erythrocytes (carry O₂), leukocytes (defense), and platelets/thrombocytes (clotting)."},
 {id:"m7-2",m:7,q:"What is plasma, and what is its main component?",a:"The liquid matrix of blood, about 90% water, carrying proteins, nutrients, hormones, wastes, and electrolytes."},
 {id:"m7-3",m:7,q:"What is the function of hemoglobin?",a:"An iron-containing protein in red blood cells that binds and transports oxygen (and some carbon dioxide)."},
 {id:"m7-4",m:7,q:"Why do mature red blood cells lack a nucleus?",a:"It maximizes space for hemoglobin — but means they cannot divide or repair, giving them a ~120-day lifespan."},
 {id:"m7-5",m:7,q:"What is hematocrit?",a:"The percentage of blood volume made up of red blood cells."},
 {id:"m7-6",m:7,q:"What is hemostasis, and what are its three steps?",a:"The stopping of bleeding: vascular spasm, platelet plug formation, and coagulation (fibrin clot)."},
 {id:"m7-7",m:7,q:"Which blood type is the universal donor, and which the universal recipient?",a:"Type O negative is the universal donor; type AB positive is the universal recipient."},
 {id:"m7-8",m:7,q:"Name the four chambers of the heart and what each receives.",a:"Right atrium (deoxygenated blood from the body), right ventricle (pumps to lungs), left atrium (oxygenated blood from lungs), left ventricle (pumps to the body)."},
 {id:"m7-9",m:7,q:"Trace a drop of blood through the heart, naming the valves.",a:"RA → tricuspid valve → RV → pulmonary valve → lungs → LA → mitral (bicuspid) valve → LV → aortic valve → aorta."},
 {id:"m7-10",m:7,q:"Why is the left ventricle wall thickest?",a:"It must generate enough pressure to pump blood through the entire systemic circuit."},
 {id:"m7-11",m:7,q:"Pulmonary vs. systemic circuit?",a:"Pulmonary carries blood from the right heart to the lungs and back to oxygenate it; systemic carries oxygenated blood from the left heart to the body and back."},
 {id:"m7-12",m:7,q:"Name the cardiac conduction pathway in order.",a:"SA node → AV node → bundle of His → right and left bundle branches → Purkinje fibers."},
 {id:"m7-13",m:7,q:"Why is the SA node called the pacemaker?",a:"It spontaneously depolarizes fastest, setting the heart rate for the entire organ."},
 {id:"m7-14",m:7,q:"Why does the AV node delay the impulse?",a:"The brief delay lets the atria finish contracting and fill the ventricles before the ventricles contract."},
 {id:"m7-15",m:7,q:"Systole vs. diastole?",a:"Systole is contraction (ejecting blood); diastole is relaxation (filling)."},
 {id:"m7-16",m:7,q:"Define cardiac output and give its formula.",a:"The volume of blood pumped by a ventricle per minute: cardiac output = heart rate × stroke volume."},
 {id:"m7-17",m:7,q:"Structural differences between arteries and veins?",a:"Arteries have thick, elastic, muscular walls to withstand pressure; veins are thinner, hold more volume, and contain valves to prevent backflow."},
 {id:"m7-18",m:7,q:"Why do veins need valves and skeletal muscle pumping?",a:"Venous pressure is low, so blood needs help returning to the heart against gravity."},
 {id:"m7-19",m:7,q:"What makes capillaries suited for exchange?",a:"Walls of a single layer of endothelium, allowing gases, nutrients, and wastes to diffuse easily between blood and tissue."},
 {id:"m7-20",m:7,q:"What do the two numbers of a blood pressure reading represent?",a:"Systolic (pressure during ventricular contraction) over diastolic (pressure during ventricular relaxation)."},
 {id:"m7-21",m:7,q:"Which vessels supply the heart muscle itself?",a:"The coronary arteries — blockage of these causes a myocardial infarction."},
 {id:"m7-22",m:7,q:"Name the major functions of the lymphatic system.",a:"Returns leaked interstitial fluid to the blood, absorbs dietary fats, and houses immune cells that filter pathogens in lymph nodes."},
 {id:"m7-23",m:7,q:"Innate vs. adaptive immunity?",a:"Innate is fast, non-specific, and present from birth (skin, inflammation, phagocytes); adaptive is slower, specific, and builds memory (B and T cells)."},
 {id:"m7-24",m:7,q:"What do B cells and T cells each do?",a:"B cells produce antibodies (humoral immunity); T cells directly attack infected cells and coordinate the response (cell-mediated immunity)."},
 {id:"m7-25",m:7,q:"What are the cardinal signs of inflammation?",a:"Redness, heat, swelling, pain, and loss of function."},
 {id:"m7-26",m:7,q:"What is an antigen versus an antibody?",a:"An antigen is a foreign marker that provokes an immune response; an antibody is the protein made by B cells to bind that specific antigen."},

 // ---------- M8 Respiratory, renal, digestive & acid–base ----------
 {id:"m8-1",m:8,q:"Where does gas exchange occur in the lungs?",a:"In the alveoli, across the respiratory membrane into surrounding capillaries."},
 {id:"m8-2",m:8,q:"What features make alveoli efficient for gas exchange?",a:"Enormous total surface area, extremely thin walls, moist surfaces, and a dense capillary network."},
 {id:"m8-3",m:8,q:"Trace the path of air from nose to alveoli.",a:"Nose/mouth → pharynx → larynx → trachea → bronchi → bronchioles → alveoli."},
 {id:"m8-4",m:8,q:"What is the primary muscle of breathing and how does inhalation work?",a:"The diaphragm; it contracts and flattens, increasing thoracic volume and lowering pressure so air flows in."},
 {id:"m8-5",m:8,q:"Why is quiet exhalation described as passive?",a:"It relies on elastic recoil of the lungs and chest wall rather than muscular effort."},
 {id:"m8-6",m:8,q:"What is surfactant and why does it matter?",a:"A lipid substance that reduces surface tension in alveoli, keeping them from collapsing — its absence causes respiratory distress syndrome in premature infants."},
 {id:"m8-7",m:8,q:"What is the primary chemical driver of respiratory rate?",a:"Rising carbon dioxide (and the resulting fall in pH), detected by central chemoreceptors — not low oxygen, under normal conditions."},
 {id:"m8-8",m:8,q:"How is most carbon dioxide transported in the blood?",a:"As bicarbonate ions (about 70%), with smaller amounts bound to hemoglobin or dissolved in plasma."},
 {id:"m8-9",m:8,q:"What is the functional unit of the kidney, and roughly how many per kidney?",a:"The nephron — about one million per kidney."},
 {id:"m8-10",m:8,q:"Name the three basic renal processes.",a:"Filtration (at the glomerulus), reabsorption (tubule back into blood), and secretion (blood into tubule)."},
 {id:"m8-11",m:8,q:"What happens at the glomerulus?",a:"Blood pressure forces water and small solutes out of the capillaries into the Bowman's capsule, forming filtrate — cells and large proteins stay behind."},
 {id:"m8-12",m:8,q:"Where is most filtrate reabsorbed?",a:"In the proximal convoluted tubule — roughly 65–70% of water, plus glucose, amino acids, and most ions."},
 {id:"m8-13",m:8,q:"List five functions of the kidneys beyond making urine.",a:"Blood pressure regulation (renin), red blood cell stimulation (erythropoietin), vitamin D activation, electrolyte balance, and acid–base balance."},
 {id:"m8-14",m:8,q:"Trace urine from kidney to outside the body.",a:"Kidney → ureter → urinary bladder → urethra."},
 {id:"m8-15",m:8,q:"What does the renin–angiotensin–aldosterone system do?",a:"Responds to low blood pressure: renin → angiotensin II (vasoconstriction) → aldosterone (sodium and water retention), raising blood pressure."},
 {id:"m8-16",m:8,q:"How do ADH and aldosterone differ in what they retain?",a:"ADH retains water alone (concentrating urine); aldosterone retains sodium, and water follows it."},
 {id:"m8-17",m:8,q:"Name the body's three lines of pH defense and their speed.",a:"Chemical buffers (instant), the respiratory system adjusting CO₂ (minutes), and the kidneys adjusting bicarbonate and H⁺ (hours to days)."},
 {id:"m8-18",m:8,q:"What is the main buffer system of the blood?",a:"The bicarbonate buffer system (HCO₃⁻ / carbonic acid)."},
 {id:"m8-19",m:8,q:"Define respiratory acidosis and give a cause.",a:"Low pH from retained CO₂ due to hypoventilation — e.g. COPD, respiratory depression, or airway obstruction."},
 {id:"m8-20",m:8,q:"Define respiratory alkalosis and give a cause.",a:"High pH from excessive CO₂ loss due to hyperventilation — e.g. anxiety, pain, or high altitude."},
 {id:"m8-21",m:8,q:"Define metabolic acidosis and give a cause.",a:"Low pH from bicarbonate loss or acid gain — e.g. diabetic ketoacidosis, severe diarrhea, or kidney failure."},
 {id:"m8-22",m:8,q:"Define metabolic alkalosis and give a cause.",a:"High pH from acid loss or bicarbonate gain — e.g. prolonged vomiting or excessive antacid use."},
 {id:"m8-23",m:8,q:"How do you tell respiratory from metabolic in an acid–base problem?",a:"Check CO₂ and bicarbonate: if the abnormal value driving the pH is CO₂, it's respiratory; if it's HCO₃⁻, it's metabolic."},
 {id:"m8-24",m:8,q:"What does compensation mean in acid–base balance?",a:"The unaffected system corrects for the other — lungs adjust CO₂ quickly for metabolic problems; kidneys adjust bicarbonate slowly for respiratory ones."},
 {id:"m8-25",m:8,q:"Trace food through the alimentary canal.",a:"Mouth → pharynx → esophagus → stomach → small intestine → large intestine → rectum → anus."},
 {id:"m8-26",m:8,q:"Name the accessory digestive organs and one job of each.",a:"Liver (produces bile), gallbladder (stores bile), pancreas (digestive enzymes and bicarbonate), salivary glands (amylase), teeth and tongue (mechanical)."},
 {id:"m8-27",m:8,q:"Where does most nutrient absorption occur, and what structures enable it?",a:"The small intestine, using villi and microvilli that create an enormous absorptive surface area."},
 {id:"m8-28",m:8,q:"What are the main jobs of the stomach?",a:"Storage, mechanical churning, and chemical breakdown of protein by pepsin in hydrochloric acid."},
 {id:"m8-29",m:8,q:"What is the primary function of the large intestine?",a:"Reabsorbing water and electrolytes, housing gut flora, and forming and storing feces."},
 {id:"m8-30",m:8,q:"What does bile do, and why is it not an enzyme?",a:"It emulsifies fats into smaller droplets so lipase can act — it physically breaks fat up rather than chemically digesting it."},
 {id:"m8-31",m:8,q:"Name three major functions of the liver.",a:"Detoxification, bile production, protein synthesis (albumin, clotting factors), glycogen storage, and nutrient metabolism (any three)."},
 {id:"m8-32",m:8,q:"Which fluid compartment holds most of the body's water?",a:"The intracellular compartment — roughly two-thirds of total body water is inside cells."}
];

// ================= diagrams =================
function C(hl,id,base){ base=base||"sh"; if(hl!==id) return base; return base==="stroke"?"strokehl":(base==="sh2"?"hl":"hl"); }
function L(hl,labels,id,x,y,txt,anchor){
  var a=anchor?' text-anchor="'+anchor+'"':'';
  if(labels) return '<text class="lb" x="'+x+'" y="'+y+'"'+a+'>'+txt+'</text>';
  if(hl===id) return '<text class="qmark" x="'+x+'" y="'+y+'"'+a+'>?</text>';
  return '';
}
function BONE(x1,y1,x2,y2,w,r1,r2){
  var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy), ang=Math.atan2(dy,dx)*180/Math.PI-90, h=w/2;
  return '<rect x="'+(-h)+'" y="0" width="'+w+'" height="'+len.toFixed(1)+'" rx="'+h+'" transform="translate('+x1+','+y1+') rotate('+ang.toFixed(1)+')"/>'+
         '<circle cx="'+x1+'" cy="'+y1+'" r="'+r1+'"/><circle cx="'+x2+'" cy="'+y2+'" r="'+r2+'"/>';
}
function LD(x1,y1,x2,y2){ return '<path class="lead" d="M'+x1+' '+y1+'L'+x2+' '+y2+'"/>'; }
function ARR(){ return '<defs>'+
 '<linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>'+
 '<radialGradient id="gr" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".40"/><stop offset=".52" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".26"/></radialGradient>'+
 '<radialGradient id="gc" cx=".5" cy=".18" r=".9"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".6" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></radialGradient>'+
 '<marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--faint)"/></marker><marker id="ahm" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--mh,var(--brand))"/></marker><marker id="ahr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#C4485C"/></marker><marker id="ahb" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#3E76B8"/></marker></defs>'; }

var DIAGRAMS={
 feedback:{m:1,title:"The negative feedback loop",sub:"The template behind almost every system you will study.",vb:"0 0 470 180",
  parts:[{id:"stimulus",label:"Stimulus",desc:"The change that disturbs the set point."},
         {id:"receptor",label:"Receptor",desc:"Detects the change and sends input."},
         {id:"control",label:"Control center",desc:"Compares input to the set point and decides the response."},
         {id:"effector",label:"Effector",desc:"The muscle or gland that carries out the response."},
         {id:"response",label:"Response",desc:"The action that reverses the original change."}],
  draw:function(hl,lb){
    var xs=[8,102,196,290,384], names=["Stimulus","Receptor","Control<tspan x='0' dy='12'>center</tspan>","Effector","Response"], ids=["stimulus","receptor","control","effector","response"];
    var s=ARR();
    for(var i=0;i<5;i++){
      s+='<rect class="'+C(hl,ids[i])+'" x="'+xs[i]+'" y="34" width="78" height="52" rx="10"/>';
      var cx=xs[i]+39;
      if(lb){ var n=names[i];
        if(n.indexOf('tspan')>-1){ s+='<text class="lbb" x="'+cx+'" y="58" text-anchor="middle">Control<tspan x="'+cx+'" dy="13">center</tspan></text>'; }
        else s+='<text class="lbb" x="'+cx+'" y="64" text-anchor="middle">'+n+'</text>';
      } else if(hl===ids[i]) s+='<text class="qmark" x="'+cx+'" y="66" text-anchor="middle">?</text>';
      if(i<4) s+='<path class="stroke" marker-end="url(#ah)" d="M'+(xs[i]+80)+' 60 L'+(xs[i+1]-4)+' 60"/>';
    }
    s+='<path class="accent" marker-end="url(#ahm)" d="M423 90 C423 140, 240 150, 47 130 L47 92"/>';
    s+='<text class="tiny" x="235" y="163" text-anchor="middle">the response reverses the original change — that is what makes it “negative”</text>';
    return s;
  }},

 cell:{m:2,title:"The cell and its organelles",sub:"Every organ is built from these parts doing their jobs.",vb:"0 0 440 270",
  parts:[{id:"membrane",label:"Plasma membrane",desc:"Selectively permeable barrier controlling what enters and leaves."},
         {id:"nucleus",label:"Nucleus",desc:"Holds DNA and directs all cell activity."},
         {id:"mito",label:"Mitochondrion",desc:"Produces ATP — the cell's power plant."},
         {id:"er",label:"Endoplasmic reticulum",desc:"Rough ER makes protein; smooth ER makes lipids and stores calcium."},
         {id:"golgi",label:"Golgi apparatus",desc:"Modifies, sorts and packages proteins into vesicles."}],
  draw:function(hl,lb){
    var s=ARR();
    s+='<ellipse class="'+C(hl,"membrane")+'" cx="215" cy="135" rx="180" ry="112"/>';
    s+='<ellipse class="vol" fill="url(#gr)" cx="215" cy="135" rx="180" ry="112"/>';
    s+='<circle class="'+C(hl,"nucleus","sh2")+'" cx="160" cy="118" r="44"/>';
    s+='<circle class="vol" fill="url(#gr)" cx="160" cy="118" r="44"/>';
    s+='<circle cx="172" cy="110" r="13" fill="var(--faint)" opacity=".35"/>';
    s+='<g><ellipse class="'+C(hl,"mito","sh2")+'" cx="300" cy="88" rx="40" ry="21"/><ellipse class="vol" fill="url(#gr)" cx="300" cy="88" rx="40" ry="21"/>';
    s+='<path class="lead" d="M268 88 q10 -11 20 0 t20 0 t20 0"/></g>';
    s+='<path class="'+C(hl,"er","stroke")+'" stroke-width="3" d="M212 168 q22 -14 44 0 t44 0" />';
    s+='<path class="'+C(hl,"er","stroke")+'" stroke-width="3" d="M212 182 q22 -14 44 0 t44 0" />';
    s+='<g class="'+C(hl,"golgi","stroke")+'" stroke-width="2.6"><path d="M112 196 q34 -16 68 0"/><path d="M116 206 q30 -14 60 0"/><path d="M120 216 q26 -12 52 0"/></g>';
    s+='<circle cx="330" cy="160" r="3" fill="var(--faint)"/><circle cx="344" cy="172" r="3" fill="var(--faint)"/><circle cx="318" cy="176" r="3" fill="var(--faint)"/>';
    s+=LD(160,74,150,32)+L(hl,lb,"nucleus",146,26,"Nucleus","middle");
    s+=LD(322,70,368,40)+L(hl,lb,"mito",370,36,"Mitochondrion","start");
    s+=LD(300,172,352,206)+L(hl,lb,"er",354,210,"ER","start");
    s+=LD(130,220,86,246)+L(hl,lb,"golgi",84,252,"Golgi","end");
    s+=LD(58,88,26,60)+L(hl,lb,"membrane",24,54,"Plasma membrane","start");
    return s;
  }},

 skin:{m:3,title:"Skin in cross-section",sub:"Three layers, interlocked — and what a burn or pressure injury destroys, in order.",vb:"0 0 530 300",
  parts:[{id:"epi",label:"Epidermis",desc:"Outermost layer. Avascular and keratinized — the true barrier. It interlocks with the dermis via rete ridges."},
         {id:"derm",label:"Dermis",desc:"The thick living layer holding blood vessels, nerves, glands and hair follicles."},
         {id:"hypo",label:"Hypodermis",desc:"Subcutaneous fat. Insulation, cushioning and energy storage."},
         {id:"foll",label:"Hair follicle",desc:"An epidermal tube reaching down into the dermis, with a bulb at its base where the hair grows."},
         {id:"sweat",label:"Sweat gland",desc:"A coiled eccrine gland whose duct carries sweat to the surface for evaporative cooling."}],
  draw:function(hl,lb){
    var s=ARR(), i, d, x;
    // hypodermis (adipose)
    s+='<path class="'+C(hl,"hypo")+'" d="M28,200 L392,200 L392,262 L28,262 Z"/>';
    s+='<g class="fine"><circle cx="66" cy="222" r="15"/><circle cx="104" cy="236" r="17"/><circle cx="146" cy="220" r="14"/><circle cx="186" cy="238" r="16"/><circle cx="228" cy="221" r="15"/><circle cx="270" cy="237" r="16"/><circle cx="312" cy="222" r="14"/><circle cx="352" cy="236" r="15"/></g>';
    // dermis
    s+='<path class="'+C(hl,"derm")+'" d="M28,62 L392,62 L392,200 L28,200 Z"/>';
    s+='<g class="fine2"><path d="M36,120 C82,112 124,126 168,118 C214,110 258,124 302,116 C336,110 366,118 386,114"/>'+
       '<path d="M36,146 C80,138 122,152 166,144 C212,136 256,150 300,142 C334,136 366,144 386,140"/>'+
       '<path d="M36,174 C80,166 122,180 166,172 C212,164 256,178 300,170 C334,164 366,172 386,168"/></g>';
    // capillary loops in the papillary dermis
    s+='<g class="oxy" fill="none" stroke-width="2"><path d="M84,104 C84,88 96,88 96,104"/><path d="M204,104 C204,88 216,88 216,104"/><path d="M324,104 C324,88 336,88 336,104"/></g>';
    // epidermis with rete ridges
    d='M28,26 L392,26 L392,68 ';
    for(i=0;i<10;i++){ x=392-i*36.4; d+='Q'+(x-18.2).toFixed(1)+',96 '+(x-36.4).toFixed(1)+',68 '; }
    d+='Z';
    s+='<path class="'+C(hl,"epi")+'" d="'+d+'"/>';
    s+='<path class="shade" d="M28,26 L392,26 L392,40 L28,40 Z"/>';
    s+='<g class="fine2"><path d="M28,46 L392,46 M28,56 L392,56"/></g>';
    // hair + follicle + sebaceous gland
    s+='<path class="'+C(hl,"foll","stroke")+'" fill="none" stroke-width="3.4" stroke-linecap="round" d="M120,4 L128,60 L140,150"/>';
    s+='<path class="'+C(hl,"foll")+'" d="M132,84 C144,86 150,96 152,112 C154,132 152,150 146,162 C140,172 128,168 126,156 C122,132 122,104 124,90 Z"/>';
    s+='<ellipse class="'+C(hl,"foll")+'" cx="143" cy="168" rx="12" ry="11"/>';
    s+='<g class="'+C(hl,"foll")+'"><circle cx="160" cy="102" r="9"/><circle cx="168" cy="112" r="7"/></g>';
    // eccrine sweat gland: duct + coil
    s+='<path class="'+C(hl,"sweat","stroke")+'" fill="none" stroke-width="3.2" stroke-linecap="round" d="M286,34 C282,60 292,84 288,110 C284,134 294,150 290,168"/>';
    s+='<path class="'+C(hl,"sweat","stroke")+'" fill="none" stroke-width="3.2" stroke-linecap="round" d="M290,168 C266,170 264,186 282,190 C300,194 300,208 282,210 C266,212 266,226 284,228 C300,230 302,242 288,246"/>';
    s+=LD(392,44,410,38)+L(hl,lb,"epi",414,42,"Epidermis","start");
    s+=LD(392,150,410,150)+L(hl,lb,"derm",414,154,"Dermis","start");
    s+=LD(392,232,410,236)+L(hl,lb,"hypo",414,240,"Hypodermis","start");
    s+=LD(120,20,84,12)+L(hl,lb,"foll",80,16,"Hair follicle","end");
    s+=LD(284,236,244,278)+L(hl,lb,"sweat",240,284,"Sweat gland","end");
    s+='<text class="tiny" x="414" y="106">rete ridges</text><path class="lead" d="M410,102 L372,86"/>';
    return s;
  }},

 sarcomere:{m:4,title:"Sliding filament mechanism",sub:"The filaments never shorten — they slide past each other.",vb:"0 0 450 220",
  parts:[{id:"z",label:"Z-disc",desc:"The boundary of a sarcomere; thin filaments anchor here."},
         {id:"actin",label:"Thin filament (actin)",desc:"Anchored to the Z-disc; carries the myosin binding sites."},
         {id:"myosin",label:"Thick filament (myosin)",desc:"Central filament whose heads pull actin inward."},
         {id:"sarco",label:"Sarcomere",desc:"The functional contractile unit, running Z-disc to Z-disc."}],
  draw:function(hl,lb){
    function row(y,z1,z2,tw){
      var t='';
      t+='<line class="'+C(hl,"z","stroke")+'" x1="'+z1+'" y1="'+(y-30)+'" x2="'+z1+'" y2="'+(y+30)+'" stroke-width="5"/>';
      t+='<line class="'+C(hl,"z","stroke")+'" x1="'+z2+'" y1="'+(y-30)+'" x2="'+z2+'" y2="'+(y+30)+'" stroke-width="5"/>';
      [-16,0,16].forEach(function(o){
        t+='<line class="'+C(hl,"actin","stroke")+'" x1="'+(z1+3)+'" y1="'+(y+o)+'" x2="'+(z1+tw)+'" y2="'+(y+o)+'" stroke-width="2.4"/>';
        t+='<line class="'+C(hl,"actin","stroke")+'" x1="'+(z2-3)+'" y1="'+(y+o)+'" x2="'+(z2-tw)+'" y2="'+(y+o)+'" stroke-width="2.4"/>';
      });
      t+='<rect class="'+C(hl,"myosin")+'" x="'+((z1+z2)/2-62)+'" y="'+(y-9)+'" width="124" height="18" rx="8"/>';
      return t;
    }
    var s=ARR();
    s+='<text class="tiny" x="18" y="26">RELAXED</text>'+row(58,64,356,96);
    s+='<text class="tiny" x="18" y="140">CONTRACTED</text>'+row(168,112,308,120);
    s+='<path class="lead" d="M64 96 L64 106 M356 96 L356 106"/><path class="stroke" marker-end="url(#ah)" d="M64 101 L356 101" stroke-dasharray="3 3" stroke-width="1"/>';
    s+=L(hl,lb,"sarco",210,116,"one sarcomere","middle");
    s+=LD(64,24,64,28)+L(hl,lb,"z",64,20,"Z-disc","middle");
    s+=LD(160,42,200,16)+L(hl,lb,"actin",204,14,"Thin (actin)","start");
    s+=LD(210,49,300,20)+L(hl,lb,"myosin",304,18,"Thick (myosin)","start");
    s+='<path class="accent" marker-end="url(#ahm)" d="M124 196 L168 196"/><path class="accent" marker-end="url(#ahm)" d="M296 196 L252 196"/>';
    s+='<text class="tiny" x="210" y="212" text-anchor="middle">Z-discs are pulled toward the center</text>';
    return s;
  }},

 neuron:{m:5,title:"Anatomy of a neuron",sub:"Signal travels one way: dendrites in, axon terminals out.",vb:"0 0 470 205",
  parts:[{id:"dend",label:"Dendrites",desc:"Receive incoming signals and carry them toward the cell body."},
         {id:"soma",label:"Cell body (soma)",desc:"Contains the nucleus and integrates incoming signals."},
         {id:"axon",label:"Axon",desc:"Conducts the action potential away from the cell body."},
         {id:"myelin",label:"Myelin sheath",desc:"Fatty insulation that dramatically speeds conduction."},
         {id:"node",label:"Node of Ranvier",desc:"Gap between myelin segments where the impulse jumps."},
         {id:"term",label:"Axon terminals",desc:"Release neurotransmitter into the synapse."}],
  draw:function(hl,lb){
    var s=ARR();
    s+='<g class="'+C(hl,"dend","stroke")+'" stroke-width="3"><path d="M92 100 L52 72 L28 60 M52 72 L34 82 M92 100 L50 116 L26 128 M50 116 L32 106 M92 100 L60 138 L44 156"/></g>';
    s+='<circle class="'+C(hl,"soma")+'" cx="112" cy="100" r="30"/><circle class="vol" fill="url(#gr)" cx="112" cy="100" r="30"/><circle cx="112" cy="100" r="11" fill="var(--faint)" opacity=".35"/>';
    s+='<line class="'+C(hl,"axon","stroke")+'" x1="142" y1="100" x2="386" y2="100" stroke-width="4"/>';
    [166,242,318].forEach(function(x){ s+='<rect class="'+C(hl,"myelin")+'" x="'+x+'" y="88" width="58" height="24" rx="11"/>'; });
    s+='<line class="'+C(hl,"node","stroke")+'" x1="228" y1="92" x2="228" y2="108" stroke-width="3"/>';
    s+='<line class="'+C(hl,"node","stroke")+'" x1="304" y1="92" x2="304" y2="108" stroke-width="3"/>';
    s+='<g class="'+C(hl,"term","stroke")+'" stroke-width="3"><path d="M386 100 L420 78 L440 70 M386 100 L422 100 L444 98 M386 100 L420 124 L438 134"/><circle cx="443" cy="68" r="4"/><circle cx="447" cy="98" r="4"/><circle cx="441" cy="136" r="4"/></g>';
    s+=LD(40,60,40,36)+L(hl,lb,"dend",38,30,"Dendrites","middle");
    s+=LD(112,70,140,40)+L(hl,lb,"soma",144,36,"Cell body","start");
    s+=LD(190,112,166,136)+L(hl,lb,"myelin",162,148,"Myelin sheath","middle");
    s+=LD(228,110,286,136)+L(hl,lb,"node",290,148,"Node of Ranvier","middle");
    s+=LD(160,100,150,74)+L(hl,lb,"axon",146,68,"Axon","end");
    s+=LD(420,124,408,140)+L(hl,lb,"term",406,152,"Axon terminals","middle");
    s+='<path class="accent" marker-end="url(#ahm)" d="M150 176 L330 176" stroke-dasharray="4 4"/><text class="tiny" x="240" y="192" text-anchor="middle">direction of impulse</text>';
    return s;
  }},

 actionpotential:{m:5,title:"The action potential",sub:"Read the shape and you understand why it is all-or-none.",vb:"0 0 470 260",
  parts:[{id:"rest",label:"Resting potential",desc:"About −70 mV: K⁺ high inside, Na⁺ high outside."},
         {id:"thresh",label:"Threshold",desc:"About −55 mV — reach it and the impulse fires fully."},
         {id:"depol",label:"Depolarization",desc:"Na⁺ channels open and Na⁺ rushes in; voltage shoots positive."},
         {id:"repol",label:"Repolarization",desc:"Na⁺ channels close, K⁺ exits, voltage falls back down."},
         {id:"hyper",label:"Hyperpolarization",desc:"Brief overshoot below resting before the pump restores it."}],
  draw:function(hl,lb){
    var s=ARR();
    s+='<line class="axis" x1="58" y1="30" x2="58" y2="208"/><line class="axis" x1="58" y1="208" x2="450" y2="208"/>';
    [[52,"+30"],[102,"0"],[152,"−55"],[182,"−70"]].forEach(function(p){ s+='<text class="tiny" x="52" y="'+(p[0]+4)+'" text-anchor="end">'+p[1]+'</text><line class="grid" x1="58" y1="'+p[0]+'" x2="450" y2="'+p[0]+'"/>'; });
    s+='<text class="tiny" x="16" y="120" transform="rotate(-90 16 120)" text-anchor="middle">membrane voltage (mV)</text>';
    s+='<text class="tiny" x="254" y="228" text-anchor="middle">time (milliseconds)</text>';
    s+='<line class="'+(hl==="thresh"?"strokehl":"dash")+'" x1="58" y1="152" x2="450" y2="152"/>';
    s+='<path class="curve" d="M58 182 L128 182 L150 152 L182 52 L214 62 L246 196 L272 196 L310 182 L450 182"/>';
    s+='<circle cx="150" cy="152" r="5" fill="var(--mh,var(--brand))"/>';
    s+=L(hl,lb,"rest",92,175,"resting","middle");
    s+=LD(150,152,120,124)+L(hl,lb,"thresh",118,118,"threshold","end");
    s+=LD(170,96,206,36)+L(hl,lb,"depol",210,32,"depolarization","start");
    s+=LD(230,130,282,110)+L(hl,lb,"repol",286,106,"repolarization","start");
    s+=LD(258,196,300,232)+L(hl,lb,"hyper",304,236,"hyperpolarization","start");
    return s;
  }},

 endocrine:{m:6,title:"An endocrine feedback axis",sub:"Find the loop and most hormone disorders explain themselves.",vb:"0 0 420 250",
  parts:[{id:"hypo",label:"Hypothalamus",desc:"Starts the axis by releasing TRH; links nervous and endocrine systems."},
         {id:"pit",label:"Anterior pituitary",desc:"Responds to TRH by releasing TSH — the 'master gland,' itself mastered."},
         {id:"thy",label:"Thyroid gland",desc:"Responds to TSH by releasing T3 and T4, raising metabolic rate."},
         {id:"fb",label:"Negative feedback",desc:"Rising T3/T4 inhibits both the hypothalamus and pituitary, shutting the axis down."}],
  draw:function(hl,lb){
    var s=ARR();
    var boxes=[["hypo","Hypothalamus",22],["pit","Anterior pituitary",100],["thy","Thyroid gland",178]];
    boxes.forEach(function(b){
      s+='<rect class="'+C(hl,b[0])+'" x="86" y="'+b[2]+'" width="170" height="46" rx="10"/>';
      if(lb) s+='<text class="lbb" x="171" y="'+(b[2]+28)+'" text-anchor="middle">'+b[1]+'</text>';
      else if(hl===b[0]) s+='<text class="qmark" x="171" y="'+(b[2]+30)+'" text-anchor="middle">?</text>';
    });
    s+='<path class="stroke" marker-end="url(#ah)" d="M171 68 L171 96"/><text class="tiny" x="180" y="86">TRH</text>';
    s+='<path class="stroke" marker-end="url(#ah)" d="M171 146 L171 174"/><text class="tiny" x="180" y="164">TSH</text>';
    s+='<path class="stroke" marker-end="url(#ah)" d="M256 201 L316 201"/><text class="tiny" x="322" y="205">T3 / T4</text>';
    s+='<path class="'+(hl==="fb"?"strokehl":"accent")+'" d="M336 192 C378 150, 378 70, 300 48 L264 48"/>';
    s+='<line class="'+(hl==="fb"?"strokehl":"accent")+'" x1="264" y1="40" x2="264" y2="56"/>';
    s+='<path class="'+(hl==="fb"?"strokehl":"accent")+'" d="M352 130 L268 122"/><line class="'+(hl==="fb"?"strokehl":"accent")+'" x1="268" y1="114" x2="268" y2="130"/>';
    s+=L(hl,lb,"fb",372,108,"inhibits","start");
    s+='<text class="tiny" x="210" y="240" text-anchor="middle">a flat-ended arrow means inhibition, not stimulation</text>';
    return s;
  }},

 heart:{m:7,title:"The heart in coronal section",sub:"Cut open from the front — chambers, valves, papillary muscles and the wall thicknesses that matter.",vb:"0 0 460 410",
  parts:[{id:"ra",label:"Right atrium",desc:"Receives deoxygenated blood from the body via the superior and inferior vena cavae."},
         {id:"rv",label:"Right ventricle",desc:"Pumps deoxygenated blood to the lungs. Note the thin wall — it only has to reach the lungs."},
         {id:"la",label:"Left atrium",desc:"Receives oxygenated blood returning from the lungs through the pulmonary veins."},
         {id:"lv",label:"Left ventricle",desc:"Pumps oxygenated blood to the entire body. By far the thickest wall in the heart."},
         {id:"tri",label:"Tricuspid valve",desc:"Three leaflets between right atrium and right ventricle, anchored by chordae tendineae to papillary muscles."},
         {id:"mit",label:"Mitral valve",desc:"Two leaflets (bicuspid) between the left atrium and left ventricle."},
         {id:"ao",label:"Aorta",desc:"The body's largest artery, carrying oxygenated blood from the left ventricle into the systemic circuit."},
         {id:"pa",label:"Pulmonary trunk",desc:"Carries deoxygenated blood from the right ventricle to the lungs."}],
  draw:function(hl,lb){
    var s=ARR();
    var body="M132,140 C106,174 100,226 112,278 C126,336 168,382 214,398 C234,405 254,398 266,378 C310,320 340,250 344,188 C348,144 332,116 306,106 C258,86 168,94 132,140 Z";
    var raC="M146,158 C128,182 126,216 138,236 C154,252 190,252 202,232 C210,214 208,176 196,158 C180,140 158,142 146,158 Z";
    var laC="M262,156 C250,178 252,214 266,232 C282,248 314,246 324,228 C334,206 332,168 318,150 C302,134 276,138 262,156 Z";
    var rvC="M132,262 C136,312 166,360 200,378 C212,385 221,376 218,361 C209,320 200,290 196,264 C178,252 146,252 132,262 Z";
    var lvC="M264,266 C260,302 266,334 278,350 C285,358 292,350 295,338 C303,306 306,282 304,262 C292,254 274,256 264,266 Z";
    // great vessels (drawn behind the muscle so they emerge from it)
    s+='<path class="'+(hl==="ao"?"strokehl":"oxy")+'" fill="none" stroke-width="16" stroke-linecap="round" d="M280,200 C304,126 274,50 220,46 C180,42 158,66 154,98"/>';
    s+='<path class="'+(hl==="pa"?"strokehl":"deoxy")+'" fill="none" stroke-width="14" stroke-linecap="round" d="M198,238 C186,158 210,84 244,68"/>';
    s+='<path class="deoxy" fill="none" stroke-width="13" stroke-linecap="round" d="M144,164 L130,34"/>';
    s+='<path class="deoxy" fill="none" stroke-width="12" stroke-linecap="round" d="M72,330 C104,310 124,282 138,254"/>';
    s+='<path class="oxy" fill="none" stroke-width="8" stroke-linecap="round" d="M346,178 L404,164 M346,202 L404,200"/>';
    // myocardium + volume
    s+='<path class="muscle" d="'+body+'"/>';
    s+='<path class="vol" fill="url(#gr)" d="'+body+'"/>';
    // chambers, each recessed with its own shading
    s+='<path class="'+C(hl,"ra","cav")+'" d="'+raC+'"/><path class="vol" fill="url(#gc)" d="'+raC+'"/>';
    s+='<path class="'+C(hl,"la","cav")+'" d="'+laC+'"/><path class="vol" fill="url(#gc)" d="'+laC+'"/>';
    s+='<path class="'+C(hl,"rv","cav")+'" d="'+rvC+'"/><path class="vol" fill="url(#gc)" d="'+rvC+'"/>';
    s+='<path class="'+C(hl,"lv","cav")+'" d="'+lvC+'"/><path class="vol" fill="url(#gc)" d="'+lvC+'"/>';
    // interventricular septum
    s+='<path class="shade" d="M196,262 C204,304 212,338 218,364 L246,364 C252,326 258,292 260,264 Z"/>';
    // papillary muscles + chordae tendineae
    s+='<g class="muscle"><path d="M170,330 C178,332 182,344 178,356 C174,366 162,366 158,356 C154,344 160,332 170,330 Z"/>'+
       '<path d="M286,320 C293,322 296,333 293,344 C289,353 279,353 275,344 C271,333 277,321 286,320 Z"/></g>';
    s+='<g class="fine"><path d="M166,330 L156,268 M172,330 L178,268 M180,332 L192,272"/><path d="M284,318 L272,266 M290,318 L296,266"/></g>';
    // valve leaflets
    s+='<g class="'+C(hl,"tri","stroke")+'" fill="none" stroke-width="3.4" stroke-linecap="round"><path d="M140,248 C148,258 152,266 154,274 M170,246 C170,258 168,266 166,274 M198,244 C192,256 188,264 186,272"/></g>';
    s+='<g class="'+C(hl,"mit","stroke")+'" fill="none" stroke-width="3.4" stroke-linecap="round"><path d="M266,244 C272,256 276,262 278,270 M316,240 C308,254 302,260 300,268"/></g>';
    s+='<path class="fine" d="M136,242 L204,240 M258,238 L328,236"/>';
    // coronary vessels on the epicardial surface
    s+='<g class="oxy" fill="none" stroke-width="3" opacity=".85"><path d="M138,196 C176,214 212,222 250,218"/><path d="M230,232 C236,286 248,332 258,368"/></g>';
    // muscle striation texture
    s+='<g class="fine2"><path d="M120,220 C132,268 152,314 178,348 M126,196 C138,246 158,296 186,332"/>'+
       '<path d="M330,214 C324,262 310,308 290,344 M338,190 C334,242 320,294 300,332"/></g>';
    s+=LD(170,200,92,186)+L(hl,lb,"ra",88,190,"Right atrium","end");
    s+=LD(168,316,90,316)+L(hl,lb,"rv",86,320,"Right ventricle","end");
    s+=LD(300,190,382,132)+L(hl,lb,"la",386,136,"Left atrium","start");
    s+=LD(290,316,376,316)+L(hl,lb,"lv",380,320,"Left ventricle","start");
    s+=LD(166,266,96,256)+L(hl,lb,"tri",92,260,"Tricuspid valve","end");
    s+=LD(292,258,368,248)+L(hl,lb,"mit",372,252,"Mitral valve","start");
    s+=LD(212,48,254,26)+L(hl,lb,"ao",258,22,"Aorta","start");
    s+=LD(234,72,178,44)+L(hl,lb,"pa",174,40,"Pulmonary trunk","end");
    s+='<text class="tiny" x="130" y="26" text-anchor="middle">SVC</text><text class="tiny" x="58" y="340" text-anchor="middle">IVC</text>';
    s+='<text class="tiny" x="410" y="170" text-anchor="start">pulmonary</text><text class="tiny" x="410" y="204" text-anchor="start">veins</text>';
    s+='<text class="tiny" x="230" y="406" text-anchor="middle">the left ventricle wall is ~3× thicker — it pumps to the whole body</text>';
    return s;
  }},

 nephron:{m:8,title:"The nephron",sub:"Filter everything at the tuft, then reclaim what the body needs along the tubule.",vb:"0 0 470 350",
  parts:[{id:"glom",label:"Glomerulus",desc:"A tuft of capillaries where blood pressure forces water and small solutes out of the blood."},
         {id:"bow",label:"Bowman's capsule",desc:"The double-walled cup that catches the filtrate and funnels it into the tubule."},
         {id:"pct",label:"Proximal convoluted tubule",desc:"Reabsorbs about two-thirds of the water plus glucose, amino acids and most ions."},
         {id:"loop",label:"Loop of Henle",desc:"Dips into the medulla and builds the concentration gradient that lets urine be concentrated."},
         {id:"dct",label:"Distal convoluted tubule",desc:"Fine-tunes sodium, potassium and acid-base; the site aldosterone acts on."},
         {id:"cd",label:"Collecting duct",desc:"Final water reabsorption under ADH control, then on toward the ureter."}],
  draw:function(hl,lb){
    var s=ARR(), i;
    // cortex / medulla bands
    s+='<rect class="shade" x="20" y="24" width="430" height="180" rx="14"/>';
    s+='<text class="tiny" x="34" y="44">CORTEX</text><text class="tiny" x="34" y="228">MEDULLA</text>';
    // afferent / efferent arterioles
    s+='<path class="oxy" fill="none" stroke-width="8" stroke-linecap="round" d="M40,84 C64,80 78,86 90,96"/>';
    s+='<path class="deoxy" fill="none" stroke-width="6.5" stroke-linecap="round" d="M132,72 C150,60 168,60 182,66"/>';
    s+='<text class="tiny" x="26" y="76">afferent</text><text class="tiny" x="188" y="60">efferent</text>';
    // Bowman capsule (crescent cup)
    s+='<path class="'+C(hl,"bow")+'" d="M150,146 C176,124 176,80 148,58 C118,34 74,44 62,76 C50,108 68,142 98,152 L102,138 C80,130 68,106 78,84 C88,62 118,54 138,68 C158,82 160,116 140,138 Z"/>';
    // glomerular tuft
    s+='<g class="'+C(hl,"glom")+'">'+
       '<ellipse cx="104" cy="86" rx="15" ry="9" transform="rotate(-24 104 86)"/>'+
       '<ellipse cx="118" cy="98" rx="14" ry="8.5" transform="rotate(22 118 98)"/>'+
       '<ellipse cx="98" cy="104" rx="15" ry="9" transform="rotate(38 98 104)"/>'+
       '<ellipse cx="116" cy="78" rx="13" ry="8" transform="rotate(58 116 78)"/>'+
       '<ellipse cx="90" cy="92" rx="12" ry="7.5" transform="rotate(6 90 92)"/></g>';
    // tubule: PCT -> descending -> loop -> ascending -> DCT -> collecting duct
    var TW=' fill="none" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"';
    s+='<path class="'+C(hl,"pct","stroke")+'"'+TW+' d="M150,146 C190,150 200,176 174,186 C148,196 152,218 182,214 C212,210 224,232 200,244"/>';
    s+='<path class="'+C(hl,"loop","stroke")+'"'+TW+' d="M200,244 C204,274 200,296 198,312 C196,330 220,338 234,326 C244,316 246,302 246,286 C247,266 249,254 250,242"/>';
    s+='<path class="'+C(hl,"dct","stroke")+'"'+TW+' d="M250,242 C276,236 288,214 266,204 C244,194 250,172 280,176 C310,180 322,160 302,148"/>';
    s+='<path class="'+C(hl,"cd","stroke")+'" fill="none" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" d="M302,148 L356,148 C368,148 374,158 374,170 L374,306"/>';
    // lumen highlights
    s+='<g class="fine2"><path d="M156,150 C188,154 194,176 172,184 M204,250 C206,278 202,300 200,312 M258,240 C280,232 286,214 268,206 M374,180 L374,300"/></g>';
    // peritubular capillaries
    s+='<g class="fine2"><path d="M182,96 C214,110 226,140 220,168 M196,80 C238,96 254,138 246,176 M150,262 C170,258 182,268 184,284 M262,262 C282,258 292,270 292,286"/></g>';
    s+='<path class="stroke" marker-end="url(#ah)" d="M374,312 L374,332"/><text class="tiny" x="382" y="330">to ureter</text>';
    s+=LD(112,74,158,24)+L(hl,lb,"glom",162,20,"Glomerulus","start");
    s+=LD(74,140,44,198)+L(hl,lb,"bow",40,202,"Bowman\'s capsule","start");
    s+=LD(190,180,232,150)+L(hl,lb,"pct",236,146,"Proximal tubule","start");
    s+=LD(214,330,168,342)+L(hl,lb,"loop",164,346,"Loop of Henle","end");
    s+=LD(290,196,340,206)+L(hl,lb,"dct",344,210,"Distal tubule","start");
    s+=LD(384,244,398,244)+L(hl,lb,"cd",402,248,"Collecting","start");
    if(lb) s+='<text class="lb" x="402" y="262">duct</text>';
    return s;
  }},

 alveolus:{m:8,title:"Gas exchange at the alveolus",sub:"Two gases, two directions, one very thin membrane.",vb:"0 0 430 240",
  parts:[{id:"alv",label:"Alveolus",desc:"Thin-walled air sac — the site of all gas exchange."},
         {id:"cap",label:"Pulmonary capillary",desc:"Carries blood right against the alveolar wall."},
         {id:"memb",label:"Respiratory membrane",desc:"The paper-thin barrier gases diffuse across."},
         {id:"o2",label:"Oxygen diffusion",desc:"O₂ moves from alveolar air into the blood."},
         {id:"co2",label:"Carbon dioxide diffusion",desc:"CO₂ moves from blood into the alveolus to be exhaled."}],
  draw:function(hl,lb){
    var s=ARR();
    s+='<path class="stroke" d="M16 44 L74 62" stroke-width="7"/><text class="tiny" x="14" y="36">from bronchiole</text>';
    s+='<circle class="'+C(hl,"alv")+'" cx="140" cy="122" r="66"/><circle class="vol" fill="url(#gc)" cx="140" cy="122" r="66"/>';
    s+='<path class="'+C(hl,"cap","stroke")+'" d="M206 60 q52 62 0 124" stroke-width="12"/>';
    s+='<line class="'+(hl==="memb"?"strokehl":"dash")+'" x1="200" y1="70" x2="200" y2="176"/>';
    s+='<path class="'+(hl==="o2"?"strokehl":"oxy")+'" marker-end="url(#ahr)" d="M172 100 L232 100"/>';
    s+='<path class="'+(hl==="co2"?"strokehl":"deoxy")+'" marker-end="url(#ahb)" d="M232 148 L172 148"/>';
    if(lb){ s+='<text class="lb" x="238" y="96">O₂ in</text><text class="lb" x="238" y="162">CO₂ out</text>'; }
    else { if(hl==="o2") s+='<text class="qmark" x="240" y="96">?</text>'; if(hl==="co2") s+='<text class="qmark" x="240" y="162">?</text>'; }
    s+=LD(112,68,88,32)+L(hl,lb,"alv",84,26,"Alveolus","end");
    s+=LD(240,180,286,206)+L(hl,lb,"cap",290,210,"Capillary","start");
    s+=LD(200,74,258,44)+L(hl,lb,"memb",262,40,"Respiratory membrane","start");
    s+='<text class="tiny" x="140" y="126" text-anchor="middle">air</text>';
    return s;
  }},

 brain:{m:5,title:"Lobes of the brain",sub:"Lateral view of the left hemisphere — folded cortex, four lobes, cerebellum and brainstem.",vb:"0 0 500 316",
  parts:[{id:"frontal",label:"Frontal lobe",desc:"Voluntary movement, judgment, planning and personality."},
         {id:"parietal",label:"Parietal lobe",desc:"Touch, pressure, temperature and spatial awareness."},
         {id:"temporal",label:"Temporal lobe",desc:"Hearing, language comprehension and memory."},
         {id:"occipital",label:"Occipital lobe",desc:"Vision — all visual processing happens here."},
         {id:"cerebellum",label:"Cerebellum",desc:"Balance, posture and smooth coordinated movement."},
         {id:"brainstem",label:"Brainstem",desc:"Heart rate, breathing and blood pressure — the vital centers."}],
  draw:function(hl,lb){
    var s=ARR(), i;
    // lobes (tiled, organic)
    s+='<path class="'+C(hl,"frontal")+'" d="M70,158 C66,116 88,76 126,56 C154,42 184,40 206,48 L200,116 C186,142 158,158 124,164 C100,168 78,166 70,158 Z"/>';
    s+='<path class="'+C(hl,"parietal")+'" d="M206,48 C246,42 292,54 320,80 C338,96 348,116 350,134 L306,140 L246,128 L200,116 Z"/>';
    s+='<path class="'+C(hl,"occipital")+'" d="M350,134 C356,158 352,182 338,198 C328,210 312,214 300,208 L292,166 L306,140 Z"/>';
    s+='<path class="'+C(hl,"temporal")+'" d="M124,164 C158,158 186,142 200,116 L246,128 L306,140 L292,166 C286,196 258,216 214,218 C170,220 138,196 124,164 Z"/>';
    s+='<path class="'+C(hl,"cerebellum")+'" d="M286,202 C316,194 350,206 356,228 C362,250 338,268 306,264 C282,260 272,238 276,216 Z"/>';
    s+='<path class="'+C(hl,"brainstem")+'" d="M256,212 C270,232 270,258 264,278 L236,278 C244,256 242,230 230,214 Z"/>';
    // sulci / gyri texture
    s+='<g class="fine"><path d="M92,142 C112,132 128,116 138,96 M112,158 C132,146 148,128 156,106 M136,60 C142,84 152,102 168,116 M164,48 C170,74 180,94 196,108"/>';
    s+='<path d="M222,54 C228,80 236,100 246,116 M254,50 C262,76 272,96 284,112 M288,60 C296,82 306,98 318,110 M318,80 C324,98 332,110 342,120"/>';
    s+='<path d="M150,170 C164,182 182,192 204,196 M168,150 C180,168 198,182 220,190 M234,138 C242,160 254,178 272,190 M262,144 C268,164 278,180 292,190"/>';
    s+='<path d="M312,146 C320,160 328,172 340,180 M300,158 C308,174 316,186 328,194"/></g>';
    // lateral sulcus + central sulcus emphasised
    s+='<path class="lead" d="M124,164 C158,158 186,142 200,116"/><path class="lead" d="M200,116 L206,48"/>';
    // cerebellar folia
    s+='<g class="fine2" transform="translate(-14,-6)"><path d="M296,216 C312,212 336,214 352,224 M292,228 C310,224 336,226 354,238 M294,240 C312,238 336,242 350,252 M300,252 C316,252 334,256 344,262"/></g>';
    s+=LD(120,84,92,44)+L(hl,lb,"frontal",88,38,"Frontal","middle");
    s+=LD(266,70,272,36)+L(hl,lb,"parietal",272,30,"Parietal","middle");
    s+=LD(346,164,400,150)+L(hl,lb,"occipital",404,154,"Occipital","start");
    s+=LD(180,212,142,248)+L(hl,lb,"temporal",138,260,"Temporal","middle");
    s+=LD(348,250,392,264)+L(hl,lb,"cerebellum",396,268,"Cerebellum","start");
    s+=LD(250,278,250,290)+L(hl,lb,"brainstem",250,304,"Brainstem","middle");
    s+='<text class="tiny" x="44" y="180">front</text><text class="tiny" x="392" y="108">back</text>';
    return s;
  }},

 skeleton:{m:3,title:"The skeleton — axial and appendicular",sub:"The axial skeleton runs down the midline; the appendicular skeleton hangs off it.",vb:"0 0 440 570",
  parts:[{id:"skull",label:"Skull",desc:"Axial. Protects the brain — 22 bones, including the mandible."},
         {id:"clavicle",label:"Clavicle",desc:"Appendicular. Part of the pectoral girdle, and the most commonly fractured bone in the body."},
         {id:"ribs",label:"Rib cage",desc:"Axial. Twelve pairs of ribs plus the sternum, caging the heart and lungs."},
         {id:"spine",label:"Vertebral column",desc:"Axial. 33 vertebrae: 7 cervical, 12 thoracic, 5 lumbar, then the sacrum and coccyx."},
         {id:"humerus",label:"Humerus",desc:"Appendicular. The single upper-arm bone, running shoulder to elbow."},
         {id:"forearm",label:"Radius & ulna",desc:"Appendicular. The radius sits on the thumb side, the ulna on the pinky side."},
         {id:"pelvis",label:"Pelvic girdle",desc:"Appendicular. Attaches the legs to the axial skeleton and cradles the pelvic organs."},
         {id:"femur",label:"Femur",desc:"Appendicular. The longest and strongest bone in the body."},
         {id:"tibfib",label:"Tibia & fibula",desc:"Appendicular. The tibia bears the weight; the slim fibula sits lateral to it."}],
  draw:function(hl,lb){
    var s=ARR(), i, y, w, CX=220;
    // ---- skull ----
    s+='<g class="'+C(hl,"skull","bone")+'">';
    s+='<path d="M220,14 C248,14 270,34 272,60 C273,76 268,88 260,94 L260,102 C260,110 251,114 240,114 L200,114 C189,114 180,110 180,102 L180,94 C172,88 167,76 168,60 C170,34 192,14 220,14 Z"/>';
    s+='<path d="M196,112 C196,128 206,138 220,138 C234,138 244,128 244,112 L244,106 L196,106 Z"/></g>';
    s+='<g class="shade2"><ellipse cx="204" cy="62" rx="9" ry="10.5"/><ellipse cx="236" cy="62" rx="9" ry="10.5"/><path d="M216,78 L224,78 L220,92 Z"/></g>';
    // ---- vertebral column + sacrum ----
    s+='<g class="'+C(hl,"spine","bone")+'">';
    for(i=0;i<16;i++){ y=142+i*12; w=(i<4?10:(i<11?12:14)); s+='<rect x="'+(CX-w)+'" y="'+y+'" width="'+(2*w)+'" height="9" rx="3.5"/>'; }
    s+='<path d="M205,336 L235,336 L227,372 L213,372 Z"/></g>';
    // ---- ribs, costal cartilage + sternum ----
    var rib='', cart='', ws=[40,50,58,64,66,62,54,44];
    for(i=0;i<8;i++){ y=176+i*16; w=ws[i];
      rib+='<path d="M'+(CX-13)+','+y+' C'+(CX-15-w)+','+(y+2)+' '+(CX-10-w)+','+(y+18)+' '+(CX-30)+','+(y+25)+'"/>';
      rib+='<path d="M'+(CX+13)+','+y+' C'+(CX+15+w)+','+(y+2)+' '+(CX+10+w)+','+(y+18)+' '+(CX+30)+','+(y+25)+'"/>';
      if(i<6){ cart+='<path d="M'+(CX-30)+','+(y+25)+' L'+(CX-11)+','+(y+30)+'"/><path d="M'+(CX+30)+','+(y+25)+' L'+(CX+11)+','+(y+30)+'"/>'; }
    }
    s+='<g class="'+C(hl,"ribs","stroke")+'" fill="none" stroke-width="4.2" stroke-linecap="round">'+rib+'</g>';
    s+='<g class="fine">'+cart+'</g>';
    s+='<path class="'+C(hl,"ribs","bone")+'" d="M210,186 L230,186 L230,258 C230,270 210,270 210,258 Z"/>';
    // ---- pectoral girdle ----
    s+='<g class="'+C(hl,"clavicle","stroke")+'" fill="none" stroke-width="6.5" stroke-linecap="round"><path d="M206,168 C186,158 162,160 148,172"/><path d="M234,168 C254,158 278,160 292,172"/></g>';
    s+='<g class="bone"><path d="M146,176 C130,184 126,208 136,222 L152,208 Z"/><path d="M294,176 C310,184 314,208 304,222 L288,208 Z"/></g>';
    // ---- arms ----
    s+='<g class="'+C(hl,"humerus","bone")+'">'+BONE(148,180,132,288,11,9,8)+BONE(292,180,308,288,11,9,8)+'</g>';
    s+='<g class="'+C(hl,"forearm","bone")+'">'+BONE(128,296,116,380,8,6,5)+BONE(139,296,131,380,6.5,5,4.5)+
        BONE(312,296,324,380,8,6,5)+BONE(301,296,309,380,6.5,5,4.5)+'</g>';
    s+='<g class="bone"><rect x="106" y="384" width="20" height="15" rx="6"/><rect x="314" y="384" width="20" height="15" rx="6"/></g>';
    // ---- pelvis ----
    s+='<path class="'+C(hl,"pelvis","bone")+'" fill-rule="evenodd" d="M178,340 C156,352 150,382 164,402 C174,416 194,422 208,412 L216,392 L224,392 L232,412 C246,422 266,416 276,402 C290,382 284,352 262,340 C240,328 200,328 178,340 Z M197,358 C184,367 182,385 191,394 C200,402 211,398 215,387 C219,376 212,360 197,358 Z M243,358 C256,367 258,385 249,394 C240,402 229,398 225,387 C221,376 228,360 243,358 Z"/>';
        // ---- legs ----
    s+='<g class="'+C(hl,"femur","bone")+'">'+BONE(194,410,186,474,13,10,9)+BONE(246,410,254,474,13,10,9)+'</g>';
    s+='<g class="bone"><ellipse cx="185" cy="482" rx="7.5" ry="5.5"/><ellipse cx="255" cy="482" rx="7.5" ry="5.5"/></g>';
    s+='<g class="'+C(hl,"tibfib","bone")+'">'+BONE(183,490,177,528,10,8,6.5)+BONE(196,492,190,526,5.5,4.5,4)+
        BONE(257,490,263,528,10,8,6.5)+BONE(244,492,250,526,5.5,4.5,4)+'</g>';
    s+='<g class="bone"><rect x="164" y="532" width="28" height="13" rx="6"/><rect x="248" y="532" width="28" height="13" rx="6"/></g>';
    // ---- labels ----
    s+=LD(196,40,116,28)+L(hl,lb,"skull",112,32,"Skull","end");
    s+=LD(178,164,116,150)+L(hl,lb,"clavicle",112,154,"Clavicle","end");
    s+=LD(140,224,102,214)+L(hl,lb,"humerus",98,218,"Humerus","end");
    s+=LD(124,338,96,344)+L(hl,lb,"forearm",92,348,"Radius & ulna","end");
    s+=LD(190,444,120,456)+L(hl,lb,"femur",116,460,"Femur","end");
    s+=LD(176,506,118,516)+L(hl,lb,"tibfib",114,520,"Tibia & fibula","end");
    s+=LD(276,214,332,198)+L(hl,lb,"ribs",336,202,"Rib cage","start");
    s+=LD(234,300,330,292)+L(hl,lb,"spine",334,296,"Vertebral column","start");
    s+=LD(276,392,334,400)+L(hl,lb,"pelvis",338,404,"Pelvic girdle","start");
    s+='<text class="tiny" x="'+CX+'" y="564" text-anchor="middle">axial = skull, spine, ribs   —   appendicular = limbs + girdles</text>';
    return s;
  }},

 resptree:{m:8,title:"The respiratory tree",sub:"One continuous airway from the nose down to the alveolus.",vb:"0 0 430 320",
  parts:[{id:"pharynx",label:"Nasal cavity & pharynx",desc:"Warms, moistens and filters incoming air before it reaches the lungs."},
         {id:"larynx",label:"Larynx",desc:"The voice box; its epiglottis flips down to keep food out of the airway."},
         {id:"trachea",label:"Trachea",desc:"The windpipe, held permanently open by C-shaped cartilage rings."},
         {id:"bronchi",label:"Primary bronchi",desc:"The trachea splits into a left and right bronchus, one per lung."},
         {id:"bronchiole",label:"Bronchioles",desc:"Progressively smaller branches; their smooth muscle constricts in asthma."},
         {id:"alveoli",label:"Alveoli",desc:"Tiny air sacs at the end of the tree — the only site of gas exchange."},
         {id:"diaphragm",label:"Diaphragm",desc:"The main muscle of breathing; it contracts and flattens to pull air in."}],
  draw:function(hl,lb){
    var s=ARR(), i;
    s+='<path class="sh2" d="M196,120 C150,116 116,150 112,196 C108,236 128,258 158,254 L196,244 Z"/>';
    s+='<path class="sh2" d="M234,120 C280,116 314,150 318,196 C322,236 302,258 272,254 L234,244 Z"/>';
    s+='<path class="'+C(hl,"pharynx")+'" d="M186,14 C168,14 158,26 162,38 C166,50 186,54 196,56 L226,56 C238,54 244,44 242,32 C240,20 226,14 212,14 Z"/>';
    s+='<rect class="'+C(hl,"larynx")+'" x="200" y="58" width="30" height="24" rx="7"/>';
    s+='<rect class="'+C(hl,"trachea")+'" x="203" y="82" width="24" height="62" rx="6"/>';
    for(i=0;i<5;i++) s+='<line class="lead" x1="203" y1="'+(92+i*11)+'" x2="227" y2="'+(92+i*11)+'"/>';
    s+='<path class="'+C(hl,"bronchi","stroke")+'" d="M209,144 L176,176 M221,144 L254,176" stroke-width="9" stroke-linecap="round"/>';
    s+='<g class="'+C(hl,"bronchiole","stroke")+'" stroke-width="4" stroke-linecap="round"><path d="M176,176 L152,200 M176,176 L182,208 M254,176 L278,200 M254,176 L248,208"/></g>';
    s+='<g class="'+C(hl,"bronchiole","stroke")+'" stroke-width="2.6" stroke-linecap="round"><path d="M152,200 L138,216 M152,200 L157,220 M182,208 L173,226 M278,200 L292,216 M248,208 L257,226"/></g>';
    s+='<g class="'+C(hl,"alveoli")+'"><circle cx="132" cy="226" r="7"/><circle cx="145" cy="234" r="6"/><circle cx="127" cy="240" r="6"/></g>';
    s+='<g class="'+C(hl,"alveoli")+'"><circle cx="298" cy="226" r="7"/><circle cx="287" cy="236" r="6"/><circle cx="305" cy="240" r="6"/></g>';
    s+='<path class="'+C(hl,"diaphragm","stroke")+'" d="M96,268 C160,296 270,296 334,268" stroke-width="7" stroke-linecap="round"/>';
    s+='<path class="accent" marker-end="url(#ahm)" d="M215,284 L215,302"/><text class="tiny" x="224" y="300">contracts down → air flows in</text>';
    s+=LD(196,30,146,20)+L(hl,lb,"pharynx",142,24,"Nasal cavity & pharynx","end");
    s+=LD(232,68,300,58)+L(hl,lb,"larynx",304,62,"Larynx","start");
    s+=LD(229,112,322,104)+L(hl,lb,"trachea",326,108,"Trachea","start");
    s+=LD(256,168,332,152)+L(hl,lb,"bronchi",336,156,"Bronchi","start");
    s+=LD(150,202,92,186)+L(hl,lb,"bronchiole",88,190,"Bronchioles","end");
    s+=LD(127,242,78,250)+L(hl,lb,"alveoli",74,254,"Alveoli","end");
    s+=LD(118,278,78,288)+L(hl,lb,"diaphragm",74,292,"Diaphragm","end");
    return s;
  }}
};

var FIGS=window.AP_FIGS||{};
function figHTML(key,opts){
  var f=FIGS[key]; if(!f) return "";
  opts=opts||{};
  return '<div class="figwrap'+(opts.cls?' '+opts.cls:'')+'"><img src="'+f.src+'" alt="'+esc(f.title)+'" loading="lazy"></div>'+
         '<div class="figcap"><b>'+esc(f.title)+'</b><span>OpenStax A&amp;P 2e · '+esc(f.fig)+' · CC BY 4.0</span></div>';
}
function bindSchem(host){
  Array.prototype.forEach.call(host.querySelectorAll("[data-schem]"),function(b){
    b.onclick=function(){ var el=document.getElementById("schem-"+b.getAttribute("data-schem")); if(!el) return; el.hidden=!el.hidden; b.textContent=el.hidden?"Show drill schematic":"Hide drill schematic"; };
  });
}
var FIGMAP=window.AP_FIGMAP||{};
function hasStage(key,part){ return !!(FIGS[key] && FIGMAP[key] && FIGMAP[key].spots && FIGMAP[key].spots[part]); }
function figStage(key,part,masked){
  var f=FIGS[key], m=FIGMAP[key], sp=m.spots[part], mo=mod(DIAGRAMS[key].m);
  var h='<div class="figstage hued" style="--mh-l:'+mo.hl+';--mh-d:'+mo.hd+'"><img src="'+f.src+'" alt="'+esc(f.title)+'">';
  if(masked){ m.masks.forEach(function(b){ h+='<i class="fmask" style="left:'+b.x+'%;top:'+b.y+'%;width:'+b.w+'%;height:'+b.h+'%"></i>'; }); }
  if(sp.src==="label"){ h+='<i class="fspot box'+(masked?'':' open')+'" style="left:'+sp.x+'%;top:'+sp.y+'%;width:'+sp.w+'%;height:'+sp.h+'%"></i>'; }
  else { h+='<i class="fspot dot'+(masked?'':' open')+'" style="left:'+sp.x+'%;top:'+sp.y+'%;width:'+(sp.r*2)+'%"></i>'; }
  h+='</div><div class="figcap"><b>'+esc(f.title)+'</b><span>OpenStax A&amp;P 2e · '+esc(f.fig)+' · CC BY 4.0</span></div>';
  return h;
}
function figExtras(key){ return key==="heart" ? figHTML("heart_chordae") : ""; }
function diaSVG(name,hl,labels,extraClass){
  var d=DIAGRAMS[name]; if(!d) return "";
  var m=mod(d.m);
  return '<svg class="dia '+(extraClass||"")+' hued" style="--mh-l:'+m.hl+';--mh-d:'+m.hd+'" viewBox="'+d.vb+'" role="img" aria-label="'+esc(d.title)+'">'+d.draw(hl,labels)+'</svg>';
}
function buildDiagramCards(){
  var out=[];
  Object.keys(DIAGRAMS).forEach(function(k){
    var d=DIAGRAMS[k];
    d.parts.forEach(function(p){
      out.push({id:"d-"+k+"-"+p.id, m:d.m, dia:k, part:p.id,
        q:"Identify the highlighted structure.", a:p.label+" — "+p.desc});
    });
  });
  return out;
}


var LESSONS={
1:[
 {id:"1-1",title:"How the body is organized — and why homeostasis is the whole point",mins:9,dia:"feedback",
  cards:["m1-1","m1-2","m1-3","m1-4","m1-5","m1-6","m1-7","m1-8","m1-17","d-feedback-stimulus","d-feedback-receptor","d-feedback-control","d-feedback-effector","d-feedback-response"],
  sections:[
   {h:"Six levels, one organism",p:"Anatomy is the study of <b>structure</b>; physiology is the study of <b>function</b>. They are inseparable — a structure exists because of what it does. The body is organized in nested levels: chemicals (atoms and molecules) build <b>cells</b>, cells with a shared job form <b>tissues</b>, tissues combine into <b>organs</b>, organs cooperate as <b>organ systems</b>, and eleven systems make the <b>organism</b>. When you meet any new structure in this course, place it on that ladder — it will tell you what to expect from it."},
   {h:"Homeostasis: the single idea every system serves",p:"Homeostasis is the maintenance of a relatively stable internal environment despite constant change outside and inside the body. Core temperature, blood pH, blood glucose, blood pressure, and fluid volume all sit inside narrow ranges. Every organ system you will study exists to defend one or more of those variables. This is the lens for the entire course: when you learn a new organ, ask <i>what variable is this protecting, and how does it know when to act?</i>"},
   {h:"Negative feedback — the mechanism of stability",p:"Almost all homeostatic control uses <b>negative feedback</b>: a change in a variable triggers a response that <i>reverses</i> the change. The loop has five parts. A <b>stimulus</b> pushes the variable off its set point. A <b>receptor</b> (sensor) detects it and reports to a <b>control center</b> — usually the brain or an endocrine gland — which compares the reading to the set point and sends a command to an <b>effector</b> (a muscle or gland). The effector's <b>response</b> opposes the original change, and once the variable is back in range the stimulus disappears and the loop quiets. Body temperature is the classic example: overheat → skin thermoreceptors → hypothalamus → sweat glands and dilated skin vessels → heat loss → temperature falls."},
   {h:"Positive feedback — rare, and always meant to finish",p:"Positive feedback <i>amplifies</i> a change instead of reversing it, so it is only used when the body wants a process to accelerate to completion. Childbirth is the textbook case: uterine contractions push the baby against the cervix, stretch receptors signal the brain, oxytocin is released, contractions get stronger, and the cycle escalates until delivery ends it. Blood clotting works the same way — activated platelets recruit more platelets until the plug is sealed."},
   {h:"Speaking anatomy: position and direction",p:"All directional language assumes <b>anatomical position</b>: standing erect, face forward, arms at the sides, palms forward. From there, <b>superior/inferior</b> mean toward the head or feet; <b>anterior/posterior</b> mean toward the front or back; <b>medial/lateral</b> mean toward or away from the midline; <b>proximal/distal</b> mean closer to or farther from the trunk (used for limbs); <b>superficial/deep</b> mean toward or away from the surface. The body's two major cavities are the <b>dorsal</b> cavity (cranial and spinal) and the <b>ventral</b> cavity (thoracic and abdominopelvic). Learn these once and every description in the book, and every chart note in your career, becomes readable."}
  ],
  terms:[["Homeostasis","Maintenance of a stable internal environment within narrow limits."],["Set point","The target value a control system defends."],["Negative feedback","A response that reverses the original change."],["Effector","The muscle or gland that carries out the response."],["Anatomical position","Erect, facing forward, palms forward — the reference for all directional terms."]],
  clinical:"Vital signs are homeostasis made visible. Temperature, pulse, respirations, blood pressure, and oxygen saturation are the body's defended variables read from the outside. When a patient's vitals drift, you are watching a feedback loop struggle — and the questions in this lesson (what is the stimulus, what is the effector, is it compensating?) are exactly the questions a nurse asks at the bedside."},
 {id:"1-2",title:"The chemistry you cannot skip — water, pH, and the four biomolecules",mins:9,dia:null,
  cards:["m1-9","m1-10","m1-11","m1-12","m1-13","m1-14","m1-15","m1-16"],
  sections:[
   {h:"Atoms, ions, and why electrolytes matter",p:"Four elements — oxygen, carbon, hydrogen, and nitrogen — make up about 96% of body mass. Atoms bond in two main ways. <b>Ionic bonds</b> transfer electrons, leaving charged particles called <b>ions</b>; when a compound like NaCl dissolves, it separates into Na⁺ and Cl⁻. Substances that dissociate into ions in water are <b>electrolytes</b>, and because they carry charge they conduct electrical signals — which is why sodium, potassium, and calcium levels govern how nerves fire and muscles contract. <b>Covalent bonds</b> share electrons and hold the stable backbones of biological molecules together."},
   {h:"Water: the medium everything happens in",p:"Water is polar — its oxygen end is slightly negative and its hydrogen ends slightly positive — so it surrounds and dissolves other polar and charged substances. That makes it the <b>universal solvent</b> and the reason blood can carry salts, sugars, and proteins. Water also has a high heat capacity, buffering temperature changes, and it participates directly in reactions (hydrolysis breaks bonds by adding water; dehydration synthesis builds them by removing it). Roughly 60% of adult body weight is water, and about two-thirds of it is inside cells."},
   {h:"pH and buffers: the narrowest window in the body",p:"pH measures hydrogen ion concentration on a scale of 0–14; below 7 is acidic, above 7 is basic. Arterial blood is held between <b>7.35 and 7.45</b> — slightly alkaline, and that range is defended more aggressively than almost any other variable, because enzymes and hemoglobin change shape outside it. Below 7.35 is <b>acidosis</b>; above 7.45 is <b>alkalosis</b>. <b>Buffers</b> resist pH change by accepting or releasing H⁺ as needed; the bicarbonate buffer (HCO₃⁻ / H₂CO₃) is the body's most important one and links directly to the lungs (which control CO₂) and the kidneys (which control bicarbonate). You will meet this again as the entire basis of acid–base balance in Module 8."},
   {h:"The four biomolecules and their jobs",p:"<b>Carbohydrates</b> (sugars and starches) are quick fuel; glucose is the body's preferred energy source and is stored as glycogen. <b>Lipids</b> (fats, phospholipids, steroids) store energy densely, build every cell membrane, insulate, and serve as the raw material for steroid hormones like cortisol and estrogen. <b>Proteins</b> are chains of amino acids folded into precise shapes; they provide structure (collagen, keratin), act as enzymes, carry molecules (hemoglobin), and defend the body (antibodies). <b>Nucleic acids</b> (DNA, RNA) store and transmit genetic information. <b>ATP</b> — adenosine triphosphate — is the cell's immediate energy currency; nearly every process that costs energy, from a muscle twitch to an ion pump, spends ATP."},
   {h:"Metabolism in one sentence",p:"Metabolism is the sum of all chemical reactions in the body, split into <b>catabolism</b> (breaking molecules down and releasing energy, like burning glucose) and <b>anabolism</b> (building molecules and consuming energy, like assembling proteins). Enzymes make these reactions possible at body temperature by lowering the energy required — and because enzymes are proteins, they are the first casualties of a pH or temperature outside the normal range."}
  ],
  terms:[["Electrolyte","A substance that separates into ions in water and conducts electricity."],["Buffer","A chemical system that resists changes in pH."],["Acidosis","Blood pH below 7.35."],["ATP","The cell's immediate energy currency."],["Catabolism","Reactions that break molecules down and release energy."]],
  clinical:"Nearly every lab panel you will ever read is this lesson. A basic metabolic panel reports electrolytes (Na⁺, K⁺, Cl⁻, HCO₃⁻) and glucose; an arterial blood gas reports pH, CO₂, and bicarbonate. A potassium of 6.0 can stop a heart; a pH of 7.2 can shut down enzymes body-wide. Chemistry is not background here — it is the patient."}
],
2:[
 {id:"2-1",title:"The cell membrane and how things get across it",mins:8,dia:null,
  cards:["m2-1","m2-2","m2-3","m2-4","m2-5","m2-6","m2-7","m2-8","m2-9"],
  sections:[
   {h:"A bilayer with gates",p:"The plasma membrane is a <b>phospholipid bilayer</b>: two layers of molecules with water-loving heads facing outward toward the fluid on each side and water-fearing tails tucked inward. This makes it <b>selectively permeable</b> — small lipid-soluble substances like oxygen, carbon dioxide, and steroid hormones slip straight through, while water-soluble and charged particles (ions, glucose, amino acids) cannot cross without help. Embedded proteins provide that help as channels, carriers, and pumps; cholesterol stiffens the membrane; carbohydrate tags on the outer surface serve as identity markers the immune system reads."},
   {h:"Passive transport: free, downhill",p:"Passive transport moves substances <i>down</i> their concentration gradient — from high to low — and costs no ATP. <b>Simple diffusion</b> is a lipid-soluble molecule drifting straight through the bilayer. <b>Facilitated diffusion</b> uses a channel or carrier protein for a substance that cannot cross on its own, still downhill, still free — glucose enters most cells this way. <b>Osmosis</b> is the diffusion of <i>water</i> across a selectively permeable membrane toward the side with more solute. <b>Filtration</b> pushes fluid through a membrane by pressure, which is exactly how the kidney begins making urine."},
   {h:"Active transport: pumps that spend ATP",p:"When a cell needs to move something <i>against</i> its gradient, it pays. The most important pump in the body is the <b>sodium–potassium pump</b> (Na⁺/K⁺-ATPase), which pushes three Na⁺ out and pulls two K⁺ in for every ATP spent. That single pump maintains the gradients — sodium high outside, potassium high inside — that every nerve impulse and muscle contraction depends on, and it consumes a substantial share of the body's resting energy. Cells also move bulk material with vesicles: <b>endocytosis</b> brings things in, <b>exocytosis</b> sends things out."},
   {h:"Tonicity: what happens to a cell in a solution",p:"Tonicity describes how a solution affects a cell's water balance. In an <b>isotonic</b> solution the solute concentration matches the cell, so there is no net water movement — 0.9% normal saline is isotonic, which is why it can be infused into a vein safely. In a <b>hypotonic</b> solution (less solute outside), water rushes in and the cell swells and may burst. In a <b>hypertonic</b> solution (more solute outside), water is drawn out and the cell shrinks. Red blood cells demonstrate all three dramatically under a microscope."}
  ],
  terms:[["Selectively permeable","Lets some substances cross and blocks others."],["Osmosis","Diffusion of water toward the higher solute concentration."],["Na⁺/K⁺ pump","Active transporter: 3 Na⁺ out, 2 K⁺ in, per ATP."],["Isotonic","Same solute concentration as the cell; no net water shift."],["Hypertonic","Higher solute outside the cell; the cell shrinks."]],
  clinical:"IV fluid therapy is applied tonicity. Normal saline and lactated Ringer's are isotonic and expand blood volume without shifting water into or out of cells. Half-normal saline is hypotonic and pushes water into cells — useful for dehydration, dangerous for a swelling brain. Hypertonic saline pulls water out of swollen tissue. Choosing the wrong bag is a cell-membrane error with a patient attached."},
 {id:"2-2",title:"Inside the cell — the organelles and what each one is for",mins:8,dia:"cell",
  cards:["m2-10","m2-11","m2-12","m2-13","m2-14","m2-20","d-cell-membrane","d-cell-nucleus","d-cell-mito","d-cell-er","d-cell-golgi"],
  sections:[
   {h:"The nucleus runs the show",p:"The <b>nucleus</b> holds the cell's DNA and directs everything the cell does by controlling which proteins get made. Inside it, the <b>nucleolus</b> assembles ribosomes. The nuclear envelope is a double membrane with pores that let messenger RNA out and regulatory proteins in. Almost every cell has one nucleus; mature red blood cells eject theirs to make room for hemoglobin, and skeletal muscle fibers carry many."},
   {h:"Making protein: ribosomes, ER, and Golgi",p:"Protein synthesis is an assembly line. <b>Ribosomes</b> read messenger RNA and string amino acids together. Ribosomes studding the <b>rough endoplasmic reticulum</b> make proteins destined for membranes or for export; the ER folds and checks them. <b>Smooth ER</b> has no ribosomes and instead makes lipids, stores calcium (critically, in muscle), and detoxifies drugs — liver cells are packed with it. Finished proteins travel in vesicles to the <b>Golgi apparatus</b>, which modifies, sorts, and packages them for delivery inside the cell or secretion outside it."},
   {h:"Power and cleanup",p:"<b>Mitochondria</b> convert glucose and oxygen into ATP through cellular respiration; cells with heavy energy demands — heart muscle, kidney tubule cells — are crowded with them. <b>Lysosomes</b> are membrane-bound bags of digestive enzymes that dismantle worn-out organelles, debris, and engulfed bacteria. <b>Peroxisomes</b> neutralize toxic peroxides. The <b>cytoskeleton</b> — microfilaments, intermediate filaments, and microtubules — gives the cell its shape, moves organelles around, and forms the spindle during cell division."},
   {h:"Dividing: the cell cycle",p:"Somatic cells reproduce by <b>mitosis</b>, producing two genetically identical daughter cells. The cycle runs through interphase (growth and DNA replication), then the stages of mitosis — <b>prophase, metaphase, anaphase, telophase</b> — followed by cytokinesis, when the cytoplasm splits. Tissues that renew constantly (skin, gut lining, bone marrow) divide rapidly; nervous and cardiac muscle cells largely do not, which is why their injuries heal poorly."}
  ],
  terms:[["Mitochondrion","Site of ATP production."],["Rough ER","Ribosome-studded; makes and folds proteins."],["Golgi apparatus","Modifies, sorts, and packages proteins."],["Lysosome","Digestive enzyme sac for cellular cleanup."],["Mitosis","Division producing two identical cells."]],
  clinical:"Chemotherapy targets the cell cycle: it kills rapidly dividing cells, which is why it hits cancer — and also hair follicles, the gut lining, and bone marrow, producing the classic side effects of hair loss, nausea, and low blood counts. Understanding which tissues divide fast predicts which will be harmed."},
 {id:"2-3",title:"The four tissue types — the vocabulary of every organ",mins:8,dia:null,
  cards:["m2-15","m2-16","m2-17","m2-18","m2-19"],
  sections:[
   {h:"Only four, and every organ is a mix",p:"Every organ in the body is built from just four tissue types: <b>epithelial</b>, <b>connective</b>, <b>muscle</b>, and <b>nervous</b>. The stomach, for example, has an epithelial lining, connective tissue support and blood supply, muscle in its wall, and nerves that coordinate it. Recognizing tissue types is what makes microscope work — and pathology reports — readable."},
   {h:"Epithelial tissue: covering and lining",p:"Epithelium covers the body surface and lines every cavity, tube, and gland. Its cells are tightly packed with almost no space between them, sit on a <b>basement membrane</b>, and are <b>avascular</b> — they have no blood vessels of their own and are fed by diffusion from the connective tissue beneath. It is classified by shape (squamous, cuboidal, columnar) and layering (simple or stratified): simple squamous epithelium is one cell thick for rapid exchange in alveoli and capillaries; stratified squamous epithelium is many layers thick for protection in skin and the esophagus. Epithelium regenerates quickly, which is why surface wounds heal fast."},
   {h:"Connective tissue: the most abundant and most varied",p:"Connective tissue binds, supports, protects, and transports. What defines it is an abundant <b>extracellular matrix</b> — cells scattered in ground substance and protein fibers (collagen for strength, elastin for stretch, reticular fibers for scaffolding). That broad definition includes loose and dense connective tissue, <b>adipose</b> (fat), <b>cartilage</b>, <b>bone</b>, and — because plasma is its matrix — <b>blood</b>. Tendons (muscle to bone) and ligaments (bone to bone) are dense regular connective tissue built from parallel collagen bundles."},
   {h:"Muscle and nervous tissue",p:"<b>Muscle tissue</b> contracts. Skeletal muscle is striated and voluntary; cardiac muscle is striated, involuntary, and joined by intercalated discs so the heart beats as one unit; smooth muscle is non-striated and involuntary, lining hollow organs and vessels. <b>Nervous tissue</b> consists of neurons, which generate and conduct electrical signals, and neuroglia, which support and protect them. Both muscle and nervous tissue have very limited ability to regenerate — damage tends to be replaced by scar rather than new function."}
  ],
  terms:[["Basement membrane","The layer anchoring epithelium to the connective tissue below."],["Avascular","Without its own blood supply."],["Extracellular matrix","The material connective-tissue cells sit in."],["Intercalated disc","Junction coupling cardiac muscle cells electrically."],["Tendon vs. ligament","Tendon: muscle to bone. Ligament: bone to bone."]],
  clinical:"Wound healing is a tissue story. A superficial scrape re-epithelializes in days because epithelium regenerates. A deep laceration through the dermis heals by connective-tissue scar. A myocardial infarction kills cardiac muscle that cannot regenerate, so the heart is left with a stiff patch of scar — which is why the damage is permanent and why the rhythm around it becomes unstable."}
]
};
LESSONS[3]=[
 {id:"3-1",title:"Skin — three layers, and what each one does for you",mins:9,dia:"skin",
  cards:["m3-1","m3-2","m3-3","m3-4","m3-5","m3-6","d-skin-epi","d-skin-derm","d-skin-hypo","d-skin-foll","d-skin-sweat"],
  sections:[
   {h:"The largest organ, and a real one",p:"Skin is not a wrapper — it is an organ with measurable jobs: physical and chemical <b>protection</b>, <b>thermoregulation</b>, <b>sensation</b>, <b>vitamin D synthesis</b> when sunlight hits it, and <b>prevention of fluid loss</b>. It accounts for roughly 15% of body weight. When a large area is destroyed, as in a major burn, the patient dies of what the skin was quietly doing: fluid loss, heat loss, and infection."},
   {h:"Epidermis: the barrier",p:"The <b>epidermis</b> is the outer layer — stratified squamous epithelium, and therefore <b>avascular</b>; it is fed by diffusion from below. New cells are born in the deepest layer (stratum basale) and pushed upward over about a month, filling with the tough protein <b>keratin</b> and dying by the time they reach the surface, where they flake off. <b>Melanocytes</b> in the basal layer produce <b>melanin</b>, which gives skin its color and absorbs UV radiation to protect the DNA of the cells beneath. Thick skin on palms and soles has five layers; thin skin elsewhere has four."},
   {h:"Dermis: the living layer",p:"The <b>dermis</b> is dense irregular connective tissue and holds everything that makes skin alive: <b>blood vessels</b>, <b>nerve endings</b> and touch receptors, <b>hair follicles</b>, <b>sebaceous (oil) glands</b>, and <b>sweat glands</b>. Its upper papillary layer projects upward into the epidermis as <b>dermal papillae</b>, interlocking the two layers so they do not shear apart (and producing your fingerprints). The deeper reticular layer's collagen and elastin give skin its strength and stretch; when they are damaged by age or sun, skin sags and wrinkles."},
   {h:"Hypodermis and the accessory structures",p:"Below the dermis lies the <b>hypodermis</b> (subcutaneous layer) — loose connective and <b>adipose</b> tissue that insulates, cushions, stores energy, and anchors skin to underlying muscle. It is technically not skin, but it is where subcutaneous injections go. Among the accessory structures, <b>eccrine sweat glands</b> cover most of the body and cool it by evaporation; <b>apocrine</b> glands in the axilla and groin activate at puberty; <b>sebaceous glands</b> secrete oily sebum into hair follicles to waterproof and lubricate; and each <b>hair follicle</b> is a tube of epidermis reaching down into the dermis, with a bulb at its base where the hair grows and a tiny arrector pili muscle that stands it upright — goosebumps."},
   {h:"How skin controls temperature",p:"When core temperature rises, the hypothalamus dilates dermal blood vessels — bringing warm blood to the surface to radiate heat — and activates sweat glands so evaporation carries heat away. When core temperature drops, vessels constrict to keep blood deep, and shivering generates heat. This is negative feedback from Module 1, with skin as the effector."}
  ],
  terms:[["Keratin","Tough protein that makes the epidermis durable and waterproof."],["Melanin","Pigment that colors skin and absorbs UV."],["Dermal papillae","Upward projections interlocking dermis with epidermis."],["Sebaceous gland","Secretes sebum into hair follicles."],["Eccrine gland","Sweat gland for evaporative cooling."]],
  clinical:"Burn depth is skin anatomy. A superficial (first-degree) burn involves only the epidermis — red, painful, heals without scarring. A partial-thickness (second-degree) burn reaches into the dermis — blisters, because fluid collects between the layers. A full-thickness (third-degree) burn destroys the dermis and its nerve endings — often painless in the center, and it cannot regenerate, so it needs grafting. Pressure injuries follow the same layers, from intact reddened skin down to exposed bone."},
 {id:"3-2",title:"Bone as living tissue — cells, remodeling, and the calcium bank",mins:8,dia:null,
  cards:["m3-10","m3-11","m3-12","m3-13","m3-20"],
  sections:[
   {h:"Bone is alive and busy",p:"Bone is dense connective tissue whose matrix is hardened by calcium phosphate crystals laid down on a collagen framework — collagen for flexibility, mineral for hardness. It is not inert. It is constantly being torn down and rebuilt by three cell types: <b>osteoblasts</b> build new bone matrix, <b>osteocytes</b> are mature osteoblasts trapped in the matrix that maintain it and sense stress, and <b>osteoclasts</b> dissolve bone and release its minerals into the blood. Roughly 10% of your skeleton is replaced every year."},
   {h:"Compact and spongy bone",p:"<b>Compact bone</b> is the dense outer shell, organized into cylindrical units called osteons around central canals that carry blood vessels. <b>Spongy (cancellous) bone</b> inside is a lattice of struts called trabeculae, arranged along lines of stress; it is lighter and its spaces hold <b>red bone marrow</b>, where blood cells are made. A long bone has a shaft (diaphysis) of compact bone around a marrow cavity, and expanded ends (epiphyses) of spongy bone capped with articular cartilage."},
   {h:"Remodeling responds to load and hormones",p:"Bone remodels in response to mechanical stress: weight-bearing exercise stimulates osteoblasts and thickens bone, while bed rest or weightlessness lets osteoclasts win and bone thins. Hormones tune the balance. <b>Parathyroid hormone</b> raises blood calcium by stimulating osteoclasts; <b>calcitonin</b> lowers it by inhibiting them. Estrogen and testosterone restrain osteoclasts, which is why bone density falls after menopause. Vitamin D is required to absorb calcium from the gut at all."},
   {h:"The skeleton as the calcium bank",p:"About 99% of the body's calcium is stored in bone. Blood calcium must stay within a narrow range because calcium drives muscle contraction, nerve signaling, and blood clotting — so when dietary calcium falls short, the body withdraws from bone to keep the blood level steady. Long-term withdrawals weaken the skeleton; this is the physiological root of <b>osteoporosis</b>, in which osteoclast resorption outpaces osteoblast formation and bones become porous and fracture-prone."}
  ],
  terms:[["Osteoblast","Bone-building cell."],["Osteoclast","Bone-resorbing cell."],["Osteocyte","Mature bone cell maintaining the matrix."],["Trabeculae","The struts of spongy bone."],["Osteoporosis","Loss of bone density from resorption exceeding formation."]],
  clinical:"A hip fracture in an older adult is usually osteoporosis catching up. Nursing care follows the physiology: weight-bearing as early as safely possible (load stimulates osteoblasts), adequate calcium and vitamin D, and awareness that immobility itself accelerates bone loss. Serum calcium is also on every basic panel — and a high value can mean the parathyroids or a tumor are pulling calcium out of bone."},
 {id:"3-3",title:"The skeleton and its joints — axial, appendicular, and how bones move",mins:9,dia:"skeleton",
  cards:["m3-7","m3-8","m3-9","m3-14","m3-15","m3-16","m3-17","m3-18","m3-19","d-skeleton-skull","d-skeleton-clavicle","d-skeleton-ribs","d-skeleton-spine","d-skeleton-humerus","d-skeleton-forearm","d-skeleton-pelvis","d-skeleton-femur","d-skeleton-tibfib"],
  sections:[
   {h:"206 bones in two divisions",p:"The adult skeleton has 206 bones split into two divisions. The <b>axial skeleton</b> forms the body's central axis: the <b>skull</b> (22 bones including the mandible), the <b>vertebral column</b>, and the <b>thoracic cage</b> (12 pairs of ribs and the sternum). The <b>appendicular skeleton</b> is everything that hangs off it: the <b>pectoral girdle</b> (clavicle and scapula), the upper limbs, the <b>pelvic girdle</b> (hip bones), and the lower limbs. The skeleton supports the body, protects organs, provides levers for muscles, stores minerals, and houses the marrow that makes blood."},
   {h:"The vertebral column",p:"Thirty-three vertebrae are stacked in five regions: <b>7 cervical</b> (neck), <b>12 thoracic</b> (each articulates with a rib), <b>5 lumbar</b> (the largest, bearing the most weight), then the <b>sacrum</b> (5 fused) and <b>coccyx</b> (4 fused). Intervertebral discs of fibrocartilage cushion the movable vertebrae. The column protects the spinal cord, which runs through the vertebral foramina and ends around L1–L2 — which is why a lumbar puncture is done below that level."},
   {h:"The limbs, bone by bone",p:"Upper limb: <b>humerus</b> (upper arm), then <b>radius</b> on the thumb side and <b>ulna</b> on the pinky side, then 8 carpals, 5 metacarpals, and 14 phalanges. Lower limb: <b>femur</b> (the longest and strongest bone in the body), the <b>patella</b>, then the weight-bearing <b>tibia</b> medially and the slender <b>fibula</b> laterally, then 7 tarsals, 5 metatarsals, and 14 phalanges. The <b>clavicle</b> is the most commonly fractured bone; the femoral neck is the classic osteoporotic fracture site."},
   {h:"Joints: classified by how much they move",p:"A joint (articulation) is anywhere two bones meet. By function: <b>synarthroses</b> are immovable (skull sutures), <b>amphiarthroses</b> slightly movable (intervertebral discs, pubic symphysis), and <b>diarthroses</b> freely movable. All freely movable joints are <b>synovial joints</b>: the bone ends are covered with articular cartilage, enclosed in a fibrous capsule, and lubricated by synovial fluid. <b>Ligaments</b> connect bone to bone and stabilize the joint; <b>tendons</b> connect muscle to bone and move it. Movements are named in pairs — flexion/extension, abduction/adduction, rotation, pronation/supination — and you will use those words in every assessment."}
  ],
  terms:[["Axial skeleton","Skull, vertebral column, thoracic cage."],["Appendicular skeleton","Limbs plus the girdles that attach them."],["Synovial joint","Freely movable joint with a fluid-filled cavity."],["Ligament","Connects bone to bone."],["Pronation / supination","Turning the palm down / up."]],
  clinical:"Range-of-motion assessment is joint anatomy in action, and fall risk is skeleton anatomy: the femoral neck, the distal radius (a fall onto an outstretched hand), and the vertebral bodies are where osteoporotic bones break. Knowing that the spinal cord ends near L1–L2 is why a lumbar puncture is safe at L3–L4 and why a thoracic spine injury threatens breathing but a low lumbar one does not."}
];
LESSONS[4]=[
 {id:"4-1",title:"How a muscle contracts — from nerve impulse to sliding filaments",mins:10,dia:"sarcomere",
  cards:["m4-1","m4-2","m4-3","m4-4","m4-5","m4-6","m4-7","m4-8","m4-9","m4-10","d-sarcomere-z","d-sarcomere-actin","d-sarcomere-myosin","d-sarcomere-sarco"],
  sections:[
   {h:"Three kinds of muscle",p:"<b>Skeletal muscle</b> is striated, voluntary, and attached to bone. <b>Cardiac muscle</b> is striated and involuntary, its cells joined end to end by <b>intercalated discs</b> that pass the electrical signal cell to cell so the heart contracts as a unit. <b>Smooth muscle</b> is non-striated and involuntary, wrapping hollow organs and blood vessels. All three share the same basic mechanism of contraction; this lesson uses skeletal muscle to teach it."},
   {h:"The sarcomere and the sliding filament model",p:"A muscle fiber is packed with myofibrils, each a chain of repeating units called <b>sarcomeres</b> running from one <b>Z-disc</b> to the next. Inside each sarcomere, thin filaments of <b>actin</b> anchor to the Z-discs and thick filaments of <b>myosin</b> sit in the center. Contraction happens when myosin heads grab the actin and pull it toward the middle: the Z-discs draw closer, the sarcomere shortens, and thousands of sarcomeres shortening together shorten the muscle. This is the <b>sliding filament model</b> — the filaments <i>slide past</i> each other; neither one gets shorter. The striations you see under a microscope are the overlapping bands of these filaments."},
   {h:"Calcium is the switch",p:"At rest, the binding sites on actin are covered by a strand of <b>tropomyosin</b> held in place by <b>troponin</b>. Contraction begins when <b>calcium</b> floods the cytoplasm and binds troponin, which shifts tropomyosin aside and exposes the sites. Now myosin heads can attach, forming <b>cross-bridges</b>. When calcium is pumped back into storage, tropomyosin covers the sites again and the muscle relaxes. No calcium, no contraction — every step downstream depends on this."},
   {h:"From nerve to fiber: excitation–contraction coupling",p:"A motor neuron delivers the command at the <b>neuromuscular junction</b>. The neuron releases <b>acetylcholine (ACh)</b>, which binds receptors on the muscle fiber and triggers an electrical impulse that races along the fiber's membrane and down into it through T-tubules. That impulse causes the <b>sarcoplasmic reticulum</b> — the fiber's calcium store — to release calcium, and the sliding filament cycle begins. The enzyme acetylcholinesterase then breaks down ACh so the signal stops; drugs and toxins that block this enzyme cause sustained contraction."},
   {h:"ATP does double duty",p:"ATP powers the myosin power stroke — but it also has a second job: a fresh ATP must bind the myosin head to <i>release</i> it from actin so the cycle can repeat. Without ATP, myosin stays locked to actin. This is exactly what happens after death: ATP production stops, cross-bridges cannot detach, and the muscles stiffen into <b>rigor mortis</b> until the proteins themselves degrade."}
  ],
  terms:[["Sarcomere","The contractile unit, Z-disc to Z-disc."],["Sliding filament model","Myosin pulls actin inward; filaments slide, not shorten."],["Troponin / tropomyosin","Regulatory proteins that hide actin's binding sites until calcium arrives."],["Neuromuscular junction","Where a motor neuron meets a muscle fiber; ACh is the messenger."],["Sarcoplasmic reticulum","The muscle fiber's calcium reservoir."]],
  clinical:"Two common drug classes act right here. Neuromuscular blockers used in surgery and intubation occupy the ACh receptor so the fiber cannot be triggered — the patient is paralyzed until it wears off or is reversed. Calcium's role also explains why severe hypocalcemia produces muscle spasms and tetany: low calcium makes nerve and muscle membranes hyperexcitable."},
 {id:"4-2",title:"Muscle in action — energy, fiber types, and how muscles work together",mins:8,dia:null,
  cards:["m4-11","m4-12","m4-13","m4-14","m4-15","m4-16","m4-17","m4-18"],
  sections:[
   {h:"Motor units and graded strength",p:"A <b>motor unit</b> is one motor neuron plus every muscle fiber it controls. Fine-control muscles (eyes, fingers) have small motor units of a few fibers; power muscles (thigh) have units of hundreds. The nervous system grades force by recruiting more motor units and by firing them faster: a single stimulus gives a <b>twitch</b>; rapid repeated stimuli fuse into a sustained, stronger contraction called <b>tetanus</b>. Even at rest, a few motor units are always active, producing <b>muscle tone</b> — the slight firmness that keeps posture without movement."},
   {h:"Fueling contraction",p:"Muscles keep only a few seconds of ATP on hand. Creatine phosphate donates a phosphate to regenerate ATP for about 15 seconds of all-out effort. Then <b>anaerobic glycolysis</b> takes over, producing ATP quickly without oxygen but generating <b>lactic acid</b> and lasting perhaps a minute. For anything longer, <b>aerobic respiration</b> in the mitochondria supplies ATP steadily as long as oxygen and fuel arrive. After intense exercise, the body keeps breathing hard to repay the <b>oxygen debt</b> — clearing lactate and restocking creatine phosphate."},
   {h:"Isotonic and isometric contraction",p:"An <b>isotonic</b> contraction changes the muscle's length and moves a load — lifting a cup. A contraction that shortens the muscle is concentric; one that lengthens it under load (lowering the cup) is eccentric. An <b>isometric</b> contraction develops tension without changing length — holding a plank, or pushing against a wall. Both kinds happen constantly during ordinary movement and posture."},
   {h:"Muscles work in pairs and are named for what they do",p:"Muscles only pull; they cannot push. So they work in opposing pairs: the <b>agonist</b> (prime mover) produces the action, the <b>antagonist</b> opposes or reverses it, and synergists assist. The biceps flexes the elbow while the triceps extends it. A muscle's fixed attachment is its <b>origin</b>; the attachment on the bone that moves is its <b>insertion</b>. Muscle names encode location, shape, size, action, or attachments — <i>rectus abdominis</i>, <i>biceps brachii</i>, <i>gluteus maximus</i> — so a name is usually a description once you know the roots. The <b>diaphragm</b>, the main muscle of breathing, is innervated by the phrenic nerve (C3–C5): a spinal cord injury above that level stops breathing."}
  ],
  terms:[["Motor unit","One motor neuron and all the fibers it innervates."],["Muscle tone","Continuous low-level contraction maintaining posture."],["Oxygen debt","Extra oxygen consumed after exercise to restore the muscle."],["Agonist / antagonist","Prime mover / the muscle that opposes it."],["Origin / insertion","Stationary attachment / moving attachment."]],
  clinical:"Intramuscular injection sites are chosen by anatomy: the deltoid, vastus lateralis, and ventrogluteal sites have thick muscle away from major nerves and vessels. Muscle tone is part of every neurological assessment — flaccid (absent tone) points to a lower motor neuron or spinal shock problem, spastic (increased tone) to an upper motor neuron lesion like stroke."}
];
LESSONS[5]=[
 {id:"5-1",title:"Nervous tissue and how the system is organized",mins:8,dia:"neuron",
  cards:["m5-1","m5-2","m5-3","m5-4","m5-10","m5-11","m5-12","m5-25","m5-28","d-neuron-dend","d-neuron-soma","d-neuron-axon","d-neuron-myelin","d-neuron-node","d-neuron-term"],
  sections:[
   {h:"Central and peripheral",p:"The nervous system has two structural divisions. The <b>central nervous system (CNS)</b> is the brain and spinal cord — the integration center. The <b>peripheral nervous system (PNS)</b> is every nerve outside it. Functionally, the PNS carries <b>sensory (afferent)</b> input toward the CNS and <b>motor (efferent)</b> output away from it. Motor output splits again into the <b>somatic</b> nervous system (voluntary control of skeletal muscle) and the <b>autonomic</b> nervous system (involuntary control of organs, vessels, and glands), which itself has sympathetic and parasympathetic branches — the subject of a later lesson."},
   {h:"The neuron",p:"The neuron is the signaling cell. <b>Dendrites</b> receive input and carry it toward the <b>cell body (soma)</b>, which holds the nucleus and integrates the signals. If the sum crosses threshold, an impulse launches down the <b>axon</b> — a single long fiber — to the <b>axon terminals</b>, which release chemical messengers onto the next cell at a <b>synapse</b>. Signals travel one direction: dendrites in, axon out. Neurons are among the longest-lived cells in the body and, in most of the CNS, do not divide to replace themselves."},
   {h:"Glia: the support crew",p:"Neurons are outnumbered by <b>neuroglia</b>, which do not fire but make firing possible. In the CNS, <b>astrocytes</b> regulate the chemical environment and help form the blood–brain barrier; <b>microglia</b> are immune cells; ependymal cells line the fluid-filled ventricles; and <b>oligodendrocytes</b> make myelin. In the PNS, <b>Schwann cells</b> make myelin and satellite cells support cell bodies. Most brain tumors arise from glia, not neurons — gliomas — because glia are the cells that still divide."},
   {h:"Myelin and speed",p:"<b>Myelin</b> is a fatty, insulating wrap laid down in segments along an axon, with tiny gaps called <b>nodes of Ranvier</b> between them. Because the insulated stretches cannot leak charge, the impulse jumps from node to node — <b>saltatory conduction</b> — up to fifty times faster than in an unmyelinated axon. Myelinated axons appear white, so <b>white matter</b> is mostly myelinated tracts (transmission) and <b>gray matter</b> is mostly cell bodies and unmyelinated fibers (processing). In <b>multiple sclerosis</b>, the immune system destroys CNS myelin; conduction slows or fails along the affected axons, producing the disease's shifting weakness, numbness, and vision problems."}
  ],
  terms:[["Afferent / efferent","Toward the CNS (sensory) / away from it (motor)."],["Dendrite","Receives signals and carries them to the cell body."],["Oligodendrocyte / Schwann cell","Myelin-makers in the CNS / PNS."],["Saltatory conduction","Impulse jumping node to node along a myelinated axon."],["Gray vs. white matter","Cell bodies (processing) vs. myelinated axons (transmission)."]],
  clinical:"Peripheral nerves can regenerate slowly along their Schwann-cell sheath, which is why a cut finger nerve may recover sensation over months. CNS axons essentially cannot, which is why spinal cord injury is permanent. Guillain-Barré syndrome demyelinates peripheral nerves and MS demyelinates central ones — same mechanism, opposite division, very different courses."},
 {id:"5-2",title:"Membrane potentials and the action potential",mins:10,dia:"actionpotential",
  cards:["m5-5","m5-6","m5-7","m5-8","m5-9","d-actionpotential-rest","d-actionpotential-thresh","d-actionpotential-depol","d-actionpotential-repol","d-actionpotential-hyper"],
  sections:[
   {h:"The resting neuron is a charged battery",p:"A resting neuron holds a voltage across its membrane of about <b>−70 mV</b> — the inside negative relative to the outside. Two things create it. The <b>sodium–potassium pump</b> keeps sodium concentrated outside and potassium concentrated inside. And the membrane at rest is far more permeable to K⁺ than to Na⁺, so potassium leaks out down its gradient, carrying positive charge away and leaving the interior negative. This <b>resting membrane potential</b> is stored energy, and it is why changes in blood potassium have such dramatic effects on nerve and heart."},
   {h:"Gated channels and threshold",p:"Neurons change their voltage by opening ion channels. Ligand-gated channels open when a neurotransmitter binds; mechanically gated channels open with stretch or pressure; <b>voltage-gated</b> channels open at a specific membrane voltage. A stimulus that lets a little Na⁺ in nudges the membrane toward zero — a small, local <b>graded potential</b>. If enough graded potentials sum to reach <b>threshold</b>, about <b>−55 mV</b>, the voltage-gated sodium channels fly open and an action potential fires. Below threshold, nothing happens; at threshold, it fires fully. This is the <b>all-or-none</b> principle: a stronger stimulus does not make a bigger impulse — it makes <i>more frequent</i> impulses."},
   {h:"The action potential, phase by phase",p:"<b>Depolarization</b>: voltage-gated Na⁺ channels open, sodium rushes in, and the membrane potential shoots up to about +30 mV. <b>Repolarization</b>: sodium channels inactivate, voltage-gated K⁺ channels open, potassium rushes out, and the voltage falls back toward rest. <b>Hyperpolarization</b>: potassium channels close slowly, so the potential briefly overshoots below −70 mV. Then the Na⁺/K⁺ pump restores the resting gradients. The whole event takes about a millisecond. During the <b>absolute refractory period</b> the neuron cannot fire again no matter the stimulus, which guarantees the impulse travels one direction and limits how fast a neuron can fire."},
   {h:"Propagation",p:"An action potential at one spot depolarizes the membrane just ahead, triggering an action potential there, and so on down the axon — a self-regenerating wave that does not fade with distance. In myelinated axons it jumps between nodes of Ranvier (saltatory conduction) far faster than it can creep along bare membrane. Larger-diameter axons also conduct faster. Pain fibers are small and thinly myelinated, which is why a sharp pain arrives after the touch that caused it."}
  ],
  terms:[["Resting membrane potential","About −70 mV, inside negative."],["Threshold","About −55 mV; the voltage that triggers an action potential."],["All-or-none","Fires fully or not at all; intensity is coded by frequency."],["Depolarization / repolarization","Na⁺ in / K⁺ out."],["Refractory period","The interval when a neuron cannot (or can barely) fire again."]],
  clinical:"Local anesthetics like lidocaine block voltage-gated sodium channels — no depolarization, no action potential, no pain signal. Potassium disorders act on the resting potential: hyperkalemia makes cells depolarize more easily and then fail to repolarize, which is why a high K⁺ shows up as peaked T waves and can arrest the heart. Every antiarrhythmic and antiseizure drug is a channel drug; this lesson is their mechanism."},
 {id:"5-3",title:"Synapses and neurotransmitters — where drugs act",mins:7,dia:null,
  cards:["m5-13","m5-14"],
  sections:[
   {h:"Crossing the gap",p:"Neurons do not touch. At a <b>synapse</b>, an action potential arriving at the axon terminal opens voltage-gated calcium channels; calcium triggers vesicles to fuse with the membrane and release <b>neurotransmitter</b> into the <b>synaptic cleft</b>. The transmitter diffuses across, binds receptors on the postsynaptic cell, and opens ion channels there — an <b>excitatory</b> transmitter depolarizes the next cell toward threshold; an <b>inhibitory</b> one hyperpolarizes it away. The signal is then ended by enzymes that break the transmitter down, by reuptake pumps that pull it back into the terminal, or by diffusion away."},
   {h:"Summation: the neuron as a calculator",p:"A single neuron receives thousands of synapses. Its cell body adds them up: excitatory inputs push toward threshold, inhibitory inputs pull away, and only if the sum at the axon hillock crosses threshold does it fire. Inputs summed over time from one synapse (temporal) or across many synapses at once (spatial) both count. This integration is the basic computation of the nervous system."},
   {h:"The transmitters you will meet constantly",p:"<b>Acetylcholine (ACh)</b> drives skeletal muscle at the neuromuscular junction and is the main parasympathetic transmitter. <b>Norepinephrine</b> is the sympathetic transmitter at most target organs and modulates arousal and attention. <b>Dopamine</b> underlies reward and voluntary movement — its loss in the substantia nigra causes Parkinson's disease. <b>Serotonin</b> shapes mood, sleep, and appetite. <b>Glutamate</b> is the brain's main excitatory transmitter; <b>GABA</b> is the main inhibitory one — and nearly every sedative, from benzodiazepines to alcohol, works by boosting GABA. <b>Endorphins</b> are the body's own opioids."}
  ],
  terms:[["Synaptic cleft","The gap between a terminal and the next cell."],["Excitatory / inhibitory","Pushes the next cell toward / away from threshold."],["Reuptake","Pumping transmitter back into the terminal to end the signal."],["GABA","The brain's main inhibitory transmitter."],["Glutamate","The brain's main excitatory transmitter."]],
  clinical:"This lesson is pharmacology's front door. SSRIs block serotonin reuptake. Benzodiazepines enhance GABA. Opioids bind endorphin receptors. Levodopa replaces dopamine. Anticholinesterase drugs (for myasthenia gravis) prolong ACh. Antipsychotics block dopamine receptors. When you learn a psychiatric or neurological drug, ask which transmitter and which step — release, receptor, breakdown, or reuptake — it touches."},
 {id:"5-4",title:"The brain and spinal cord — a working map",mins:11,dia:"brain",
  cards:["m5-15","m5-16","m5-17","m5-18","m5-19","m5-20","m5-21","m5-24","m5-26","m5-27","d-brain-frontal","d-brain-parietal","d-brain-temporal","d-brain-occipital","d-brain-cerebellum","d-brain-brainstem"],
  sections:[
   {h:"The cerebrum and its lobes",p:"The <b>cerebrum</b> is the large, folded upper brain; its outer gray matter is the <b>cerebral cortex</b>, and its folds (gyri) and grooves (sulci) multiply the surface area for processing. Each hemisphere has four lobes. The <b>frontal lobe</b> handles voluntary movement (from the precentral gyrus), speech production, planning, judgment, and personality. The <b>parietal lobe</b> processes touch, pressure, temperature, and pain (postcentral gyrus) and builds spatial awareness. The <b>temporal lobe</b> handles hearing, language comprehension, and memory. The <b>occipital lobe</b> is vision. The two hemispheres communicate through the corpus callosum, and each mostly controls the <i>opposite</i> side of the body."},
   {h:"Beneath the cortex",p:"The <b>thalamus</b> is the relay station — nearly all sensory input passes through it on the way to the cortex. Just below, the <b>hypothalamus</b> is the master of homeostasis: temperature, hunger, thirst, sleep, and the link to the endocrine system through the pituitary gland. The <b>basal nuclei</b> smooth and coordinate movement; their dopamine-dependent circuits are what fail in Parkinson's. The limbic system, including the hippocampus and amygdala, handles memory formation and emotion."},
   {h:"Brainstem and cerebellum",p:"The <b>brainstem</b> — <b>midbrain, pons, and medulla oblongata</b> — connects brain to spinal cord and contains the centers that keep you alive: the medulla regulates heart rate, blood pressure, and breathing, and hosts the vomiting and swallowing reflexes. Ten of the twelve cranial nerves emerge here. Damage to the brainstem is so often fatal that brain death is defined largely by the loss of its reflexes. The <b>cerebellum</b> sits behind it and coordinates balance, posture, and the smooth timing of voluntary movement; a person with cerebellar damage can move but cannot move precisely."},
   {h:"Protection: meninges, CSF, and the blood–brain barrier",p:"Three membranes wrap the CNS: the tough outer <b>dura mater</b>, the web-like <b>arachnoid mater</b>, and the delicate <b>pia mater</b> clinging to the surface. <b>Cerebrospinal fluid (CSF)</b> circulates in the subarachnoid space and the ventricles, cushioning the brain, floating it to reduce its effective weight, and carrying nutrients and waste. The <b>blood–brain barrier</b> — tight junctions between brain capillary cells — blocks most substances in the blood from reaching brain tissue, protecting it from toxins but also blocking many drugs and antibiotics."},
   {h:"The spinal cord and reflexes",p:"The spinal cord carries ascending sensory tracts and descending motor tracts, and it ends around L1–L2, with nerve roots continuing below as the cauda equina. It gives off <b>31 pairs of spinal nerves</b>; the brain gives off <b>12 pairs of cranial nerves</b>. The cord also handles <b>reflexes</b> on its own: in a reflex arc, a receptor fires a sensory neuron, which synapses in the cord directly (or through one interneuron) onto a motor neuron, which fires the effector — all before the brain knows. Bypassing the brain is the point; it is why you pull your hand from a hot stove before you feel the burn."}
  ],
  terms:[["Frontal / parietal / temporal / occipital","Movement & judgment / touch & space / hearing & memory / vision."],["Thalamus","Sensory relay station to the cortex."],["Hypothalamus","Homeostasis center; links nervous and endocrine systems."],["Medulla oblongata","Brainstem center for heart rate, breathing, blood pressure."],["Reflex arc","Receptor → sensory neuron → cord → motor neuron → effector."]],
  clinical:"Stroke assessment is this map. A left middle cerebral artery stroke hits the frontal and temporal lobes: right-sided weakness and, because language sits on the left in most people, aphasia. An occipital stroke causes vision loss with normal strength. A cerebellar stroke causes ataxia and vertigo. Rising intracranial pressure pushes the brainstem downward and is a life-threatening emergency, which is why a change in level of consciousness, pupils, or breathing pattern is the finding you report first."},
 {id:"5-5",title:"The autonomic nervous system — fight-or-flight versus rest-and-digest",mins:7,dia:null,
  cards:["m5-22","m5-23"],
  sections:[
   {h:"Two divisions, most organs get both",p:"The autonomic nervous system runs the body's involuntary machinery — heart rate, blood vessel tone, digestion, pupil size, glands — through two opposing branches. The <b>sympathetic</b> division prepares the body for action: <b>fight or flight</b>. The <b>parasympathetic</b> division conserves and restores: <b>rest and digest</b>. Nearly every organ receives fibers from both, and its current state is the balance between them. Each pathway uses two neurons: a preganglionic neuron from the CNS synapses in a ganglion onto a postganglionic neuron that reaches the organ."},
   {h:"Sympathetic activation",p:"Sympathetic output raises heart rate and the force of contraction, dilates the airways, dilates the pupils, shunts blood from skin and gut to skeletal muscle, releases glucose from the liver, slows digestion, and triggers sweating. The adrenal medulla amplifies all of this by dumping epinephrine and norepinephrine into the blood. At most target organs the sympathetic transmitter is <b>norepinephrine</b>, acting on alpha and beta adrenergic receptors — which is why drugs named for those receptors (beta-blockers, alpha-agonists) do what they do."},
   {h:"Parasympathetic activation",p:"Parasympathetic output, carried largely by the <b>vagus nerve</b>, slows the heart, constricts the pupils and airways, and stimulates digestion, salivation, and elimination. Its transmitter at target organs is <b>acetylcholine</b> acting on muscarinic receptors, so anticholinergic drugs produce the opposite picture — dry mouth, fast heart, dilated pupils, constipation, urinary retention. A useful memory hook: stimulating the vagus (bearing down, carotid massage) can slow a racing heart."}
  ],
  terms:[["Sympathetic","Fight or flight; norepinephrine at targets."],["Parasympathetic","Rest and digest; acetylcholine at targets."],["Vagus nerve","Main parasympathetic nerve to heart and gut."],["Adrenergic receptors","Alpha and beta receptors for norepinephrine/epinephrine."],["Muscarinic receptors","ACh receptors on parasympathetic target organs."]],
  clinical:"Read a patient's vitals as autonomic tone. Tachycardia, dilated pupils, pale cool skin, and sweating is sympathetic surge — pain, fear, blood loss, or hypoglycemia. A drug's side-effect list is usually just the autonomic receptors it touches: beta-blockers slow the heart and can tighten airways in asthmatics; atropine blocks ACh and is given to speed a dangerously slow heart."}
];
LESSONS[6]=[
 {id:"6-1",title:"How hormones work — receptors, feedback, and the hypothalamus–pituitary axis",mins:9,dia:"endocrine",
  cards:["m6-1","m6-2","m6-3","m6-4","m6-5","m6-6","m6-7","m6-15","d-endocrine-hypo","d-endocrine-pit","d-endocrine-thy","d-endocrine-fb"],
  sections:[
   {h:"Slow, broad, and lasting",p:"The nervous system sends fast, targeted, short-lived signals along wires. The endocrine system sends <b>hormones</b> — chemical messengers released by ductless <b>endocrine glands</b> into the blood — that reach every cell in the body, act more slowly, and keep acting for minutes to days. (<b>Exocrine</b> glands, by contrast, secrete through ducts onto a surface: sweat, saliva, digestive enzymes.) A hormone floods the whole body but affects only cells that carry its <b>receptor</b>; that is how one signal produces a specific effect. Water-soluble hormones (most peptides, epinephrine) bind receptors on the cell surface and trigger second messengers inside. Lipid-soluble hormones (steroids like cortisol, and thyroid hormone) pass through the membrane and switch genes on or off directly, which is why their effects build slowly and last."},
   {h:"The hypothalamus rules the pituitary",p:"The <b>pituitary gland</b> was called the master gland because its hormones control so many others — but it is itself controlled by the <b>hypothalamus</b>, the brain region that links the nervous and endocrine systems. The hypothalamus sends releasing and inhibiting hormones through a private set of vessels to the <b>anterior pituitary</b>, which then releases growth hormone (GH), thyroid-stimulating hormone (TSH), adrenocorticotropic hormone (ACTH), follicle-stimulating and luteinizing hormones (FSH, LH), and prolactin. The <b>posterior pituitary</b> does not make hormones at all: it stores and releases two made in the hypothalamus — <b>antidiuretic hormone (ADH)</b>, which tells the kidneys to reabsorb water, and <b>oxytocin</b>, which drives labor contractions and milk let-down."},
   {h:"Negative feedback, hormone edition",p:"Endocrine axes regulate themselves by negative feedback. Take the thyroid: low thyroid hormone prompts the hypothalamus to release TRH; TRH makes the anterior pituitary release TSH; TSH makes the thyroid release T3 and T4; and rising T3/T4 then <i>inhibit</i> both TRH and TSH, shutting the axis down. The same pattern governs cortisol (CRH → ACTH → cortisol) and the sex hormones. Once you can trace the loop, most endocrine disorders explain themselves: a failing thyroid gland means low T4 and a <i>high</i> TSH, because the pituitary keeps shouting at a gland that cannot answer."},
   {h:"Reading the loop diagnostically",p:"Because of feedback, the level of the controlling hormone tells you where a problem lives. High TSH with low T4 is primary hypothyroidism (the gland). Low TSH with low T4 points upstream to the pituitary. Low TSH with high T4 is hyperthyroidism — the gland is overproducing and the pituitary has backed off. This logic is the same one used for cortisol and ACTH, and it is why a lab report lists both hormones side by side."}
  ],
  terms:[["Endocrine vs. exocrine","Ductless, into blood / through ducts onto a surface."],["Target cell","A cell that carries the receptor for a given hormone."],["Anterior pituitary","Releases GH, TSH, ACTH, FSH, LH, prolactin under hypothalamic control."],["ADH","Posterior pituitary hormone that makes the kidney retain water."],["TSH","Pituitary hormone driving the thyroid; rises when thyroid hormone falls."]],
  clinical:"Thyroid disease is common and its labs are pure feedback logic. A patient on levothyroxine is dosed to normalize TSH, not just T4, because TSH is the pituitary's honest verdict on whether the body has enough. Diabetes insipidus — not to be confused with diabetes mellitus — is ADH failure: the kidneys cannot hold water, and the patient produces liters of dilute urine."},
 {id:"6-2",title:"The major glands — thyroid, parathyroid, adrenals, and pancreas",mins:10,dia:null,
  cards:["m6-8","m6-9","m6-10","m6-11","m6-12","m6-13","m6-14","m6-16"],
  sections:[
   {h:"Thyroid and parathyroids",p:"The <b>thyroid</b> sits in front of the trachea and makes <b>T3 and T4</b>, which set the body's metabolic rate — heat production, heart rate, energy use, growth. Too much (hyperthyroidism) runs everything fast: weight loss, heat intolerance, tachycardia, anxiety. Too little runs everything slow: weight gain, cold intolerance, fatigue, bradycardia. The thyroid also makes <b>calcitonin</b>, which lowers blood calcium. Embedded on its back are four tiny <b>parathyroid glands</b> that do the opposite: <b>parathyroid hormone (PTH)</b> raises blood calcium by stimulating osteoclasts, increasing kidney reabsorption, and activating vitamin D. PTH is the dominant calcium regulator; calcitonin is minor."},
   {h:"The adrenal glands",p:"Each adrenal gland caps a kidney and is really two organs. The outer <b>adrenal cortex</b> makes steroids: <b>aldosterone</b>, which tells the kidney to retain sodium (and with it, water) and excrete potassium, raising blood volume and pressure; <b>cortisol</b>, the long-term stress hormone, which raises blood glucose, breaks down protein and fat for fuel, and suppresses inflammation and immunity; and small amounts of sex hormones. The inner <b>adrenal medulla</b> is essentially a sympathetic ganglion that releases <b>epinephrine and norepinephrine</b> into the blood for the rapid fight-or-flight surge."},
   {h:"The pancreas and blood glucose",p:"The pancreas is both exocrine (digestive enzymes) and endocrine (islets of Langerhans). In the islets, <b>beta cells</b> release <b>insulin</b> when blood glucose rises after a meal; insulin drives glucose into cells and promotes storage as glycogen and fat, lowering blood glucose. <b>Alpha cells</b> release <b>glucagon</b> when glucose falls; glucagon makes the liver release stored glucose, raising it. The two hormones oppose each other minute to minute and hold blood glucose in a range of roughly 70–100 mg/dL fasting."},
   {h:"Diabetes mellitus, mechanistically",p:"<b>Type 1 diabetes</b> is the autoimmune destruction of beta cells: no insulin is made, so glucose cannot enter cells and piles up in the blood while cells starve and burn fat instead, producing ketones — the basis of diabetic ketoacidosis. <b>Type 2 diabetes</b> begins as <b>insulin resistance</b>: insulin is present but target cells respond poorly, the pancreas overworks to compensate, and eventually beta cells fail. In both, chronically high glucose damages blood vessels and nerves, which is why the complications are heart disease, kidney failure, blindness, and neuropathy."}
  ],
  terms:[["T3 / T4","Thyroid hormones that set metabolic rate."],["PTH","Parathyroid hormone; the main raiser of blood calcium."],["Aldosterone","Adrenal cortex hormone: retain Na⁺ and water, excrete K⁺."],["Cortisol","Long-term stress hormone; raises glucose, suppresses inflammation."],["Insulin / glucagon","Lower / raise blood glucose."]],
  clinical:"Hypoglycemia is a nursing emergency you can reason through: a diabetic patient who took insulin and skipped a meal becomes shaky, sweaty, confused, and tachycardic — the sympathetic surge and the glucose-starved brain. The fix is glucose, fast. Long-term steroid therapy mimics excess cortisol (weight gain, high glucose, thin skin, infection risk) and, because it suppresses the body's own axis, can never be stopped abruptly."}
];
LESSONS[7]=[
 {id:"7-1",title:"Blood — what it carries and how it clots",mins:8,dia:null,
  cards:["m7-1","m7-2","m7-3","m7-4","m7-5","m7-6","m7-7"],
  sections:[
   {h:"A connective tissue that flows",p:"Blood is connective tissue whose matrix is liquid: <b>plasma</b>, about 90% water, carries proteins (albumin for osmotic pressure, antibodies, clotting factors), nutrients, hormones, gases, wastes, and electrolytes. Suspended in it are the <b>formed elements</b>: <b>erythrocytes</b> (red blood cells) that carry oxygen, <b>leukocytes</b> (white blood cells) that defend, and <b>platelets</b> that clot. The fraction of blood volume made up of red cells is the <b>hematocrit</b> — roughly 45% in men and 40% in women. An adult carries about five liters."},
   {h:"Red cells and hemoglobin",p:"Red blood cells are biconcave discs with no nucleus, which maximizes room for <b>hemoglobin</b> — the iron-containing protein that binds oxygen in the lungs and releases it in the tissues. Each hemoglobin molecule carries four oxygen molecules; a single red cell holds about 250 million of them. Red cells are made in red bone marrow under the direction of <b>erythropoietin</b>, a hormone the kidneys release when oxygen is low, and they live about 120 days before the spleen and liver recycle them. Too few red cells or too little hemoglobin is <b>anemia</b>: oxygen delivery falls no matter how well the lungs work."},
   {h:"White cells and platelets",p:"Leukocytes are the mobile immune system. Neutrophils are the most numerous and the first responders to bacterial infection; lymphocytes (B and T cells) run adaptive immunity; monocytes become tissue macrophages; eosinophils and basophils handle parasites and allergy. A rising neutrophil count signals infection; a falling one signals a bone marrow under attack. <b>Platelets</b> are cell fragments that patrol for damaged vessels."},
   {h:"Hemostasis: stopping the bleeding",p:"When a vessel is cut, hemostasis proceeds in three steps. <b>Vascular spasm</b>: the vessel constricts to slow flow. <b>Platelet plug</b>: platelets stick to the exposed collagen and to each other, releasing chemicals that recruit more — a positive feedback loop. <b>Coagulation</b>: a cascade of clotting factors, most made in the liver and several dependent on vitamin K, converts fibrinogen into <b>fibrin</b> threads that mesh the plug into a solid clot. Later, the clot is dissolved by plasmin. Blood types matter here too: the A and B antigens on red cells, plus the Rh factor, determine compatibility — <b>O negative</b> lacks all three and is the universal donor; <b>AB positive</b> has all three and is the universal recipient."}
  ],
  terms:[["Plasma","The liquid matrix of blood."],["Hematocrit","Percentage of blood volume that is red cells."],["Hemoglobin","Iron-containing oxygen carrier in red cells."],["Erythropoietin","Kidney hormone that stimulates red cell production."],["Fibrin","Protein threads that form the clot."]],
  clinical:"A complete blood count is this lesson in numbers: hemoglobin and hematocrit for oxygen-carrying capacity, white count and differential for infection or marrow disease, platelets for bleeding risk. Anticoagulants target the cascade — warfarin blocks vitamin K, heparin amplifies a natural inhibitor — which is why INR and aPTT are monitored, and why a patient on them bruises and bleeds."},
 {id:"7-2",title:"The heart — chambers, valves, the conduction system, and the cardiac cycle",mins:12,dia:"heart",
  cards:["m7-8","m7-9","m7-10","m7-11","m7-12","m7-13","m7-14","m7-15","m7-16","m7-21","d-heart-ra","d-heart-rv","d-heart-la","d-heart-lv","d-heart-tri","d-heart-mit","d-heart-ao","d-heart-pa"],
  sections:[
   {h:"Four chambers, two pumps",p:"The heart is two pumps side by side. The right side receives deoxygenated blood from the body and sends it to the lungs — the <b>pulmonary circuit</b>. The left side receives oxygenated blood from the lungs and sends it to the whole body — the <b>systemic circuit</b>. Each side has a receiving chamber, the <b>atrium</b>, and a pumping chamber, the <b>ventricle</b>. The <b>left ventricle</b> has by far the thickest wall because it must generate enough pressure to push blood through the entire body, while the right ventricle only reaches the nearby lungs. A muscular wall, the <b>septum</b>, separates the two sides so the two blood supplies never mix."},
   {h:"The path of blood — memorize it cold",p:"Deoxygenated blood enters the <b>right atrium</b> from the superior and inferior vena cavae → passes through the <b>tricuspid valve</b> → into the <b>right ventricle</b> → out through the <b>pulmonary valve</b> into the <b>pulmonary trunk</b> and arteries → to the lungs, where it picks up oxygen → returns through four pulmonary veins into the <b>left atrium</b> → through the <b>mitral (bicuspid) valve</b> → into the <b>left ventricle</b> → out through the <b>aortic valve</b> into the <b>aorta</b> → to the body. The two atrioventricular valves (tricuspid, mitral) are tethered by <b>chordae tendineae</b> to <b>papillary muscles</b> that keep them from blowing backward under ventricular pressure. The heart muscle itself is fed not from inside the chambers but by the <b>coronary arteries</b> branching off the aorta — the arteries whose blockage causes a heart attack."},
   {h:"The heart's own pacemaker",p:"Cardiac muscle contracts on its own, driven by a built-in conduction system. The <b>sinoatrial (SA) node</b> in the right atrium depolarizes spontaneously fastest of all, so it sets the pace — about 60–100 beats per minute. Its impulse spreads across both atria (they contract), then reaches the <b>atrioventricular (AV) node</b>, which <i>delays</i> it for about a tenth of a second so the ventricles can finish filling. The impulse then races down the <b>bundle of His</b>, the right and left <b>bundle branches</b>, and the <b>Purkinje fibers</b>, so the ventricles contract as a unit from the apex upward. The ECG records exactly this sequence: the P wave is atrial depolarization, the QRS complex is ventricular depolarization, and the T wave is ventricular repolarization."},
   {h:"The cardiac cycle and cardiac output",p:"One heartbeat is one cardiac cycle: <b>diastole</b>, when the chambers relax and fill, and <b>systole</b>, when they contract and eject. The \"lub\" of a heartbeat is the AV valves snapping shut as ventricular systole begins; the \"dub\" is the semilunar valves closing as it ends. The volume of blood one ventricle pumps per minute is <b>cardiac output</b> = <b>heart rate × stroke volume</b>, about 5 liters at rest. Stroke volume rises when the ventricle fills more (preload), contracts harder (contractility), or pushes against less resistance (afterload). The autonomic nervous system tunes rate and contractility beat to beat: sympathetic input speeds and strengthens, parasympathetic (vagal) input slows."}
  ],
  terms:[["Tricuspid / mitral","Right / left atrioventricular valves."],["SA node","The pacemaker in the right atrium."],["AV node","Delays the impulse so the ventricles fill first."],["Systole / diastole","Contraction / relaxation and filling."],["Cardiac output","Heart rate × stroke volume, ~5 L/min at rest."]],
  clinical:"Heart failure is cardiac output that cannot meet demand. Left-sided failure backs blood up into the lungs — crackles, shortness of breath, pink frothy sputum. Right-sided failure backs blood up into the body — swollen legs, distended neck veins, an enlarged liver. A blocked coronary artery starves the muscle it feeds, and the ECG shows which wall by which leads change. Every rhythm you will ever read on a monitor is the conduction system in this lesson, working or failing."},
 {id:"7-3",title:"Vessels and blood pressure — how flow is delivered and controlled",mins:8,dia:null,
  cards:["m7-17","m7-18","m7-19","m7-20"],
  sections:[
   {h:"Arteries, capillaries, veins",p:"<b>Arteries</b> carry blood away from the heart under high pressure; their walls are thick, muscular, and elastic, stretching with each beat and recoiling to keep blood moving between beats. They branch into arterioles, whose smooth muscle is the main adjustable resistance in the system. Arterioles feed <b>capillaries</b> — vessels one endothelial cell thick, where all exchange of gases, nutrients, and wastes happens across their walls. Capillaries drain into venules and then <b>veins</b>, which return blood to the heart under low pressure; their walls are thin, they hold most of the body's blood volume at any moment, and they contain <b>valves</b> to prevent backflow, relying on skeletal muscle contraction and breathing to push blood upward against gravity."},
   {h:"What blood pressure means",p:"Blood pressure is the force blood exerts on arterial walls, reported as <b>systolic</b> (during ventricular contraction) over <b>diastolic</b> (during relaxation), normally around 120/80 mmHg. It is the product of <b>cardiac output</b> and <b>peripheral resistance</b> — how hard it is to push blood through the arterioles. Widen the arterioles and pressure falls; constrict them and it rises. Blood volume matters too: lose a liter of blood and pressure drops; retain salt and water and it climbs. Pressure falls steadily from the aorta (about 100 mmHg mean) to the capillaries (about 30) to the vena cavae (near zero), which is the gradient that drives flow."},
   {h:"Regulating pressure",p:"Short-term control is neural: <b>baroreceptors</b> in the carotid sinus and aortic arch sense stretch and report to the medulla, which adjusts heart rate and arteriolar tone within seconds — stand up quickly, pressure dips, and the reflex restores it before you faint. Long-term control is renal and hormonal: the kidneys adjust blood volume through the renin–angiotensin–aldosterone system and ADH, both covered in Module 8. Hypertension develops when these systems settle at a set point that is too high, quietly damaging arteries, heart, kidneys, and retina for years."},
   {h:"Capillary exchange",p:"At the arterial end of a capillary, blood pressure pushes fluid out into the tissues; at the venous end, the osmotic pull of plasma proteins (mainly albumin) draws most of it back. The small excess that stays in the tissue is collected by the lymphatic system. Upset that balance — high venous pressure in heart failure, low albumin in liver disease or malnutrition, leaky capillaries in inflammation — and fluid accumulates in the tissues as <b>edema</b>."}
  ],
  terms:[["Arteriole","Small artery whose smooth muscle sets peripheral resistance."],["Capillary","Single-cell-thick exchange vessel."],["Systolic / diastolic pressure","Pressure during ventricular contraction / relaxation."],["Baroreceptor","Pressure sensor in the carotid sinus and aortic arch."],["Edema","Excess fluid in the tissues."]],
  clinical:"Shock is blood pressure failing to perfuse organs, and its types map onto this lesson: hypovolemic (too little volume), cardiogenic (the pump fails), distributive (arterioles dilate massively, as in sepsis and anaphylaxis). Orthostatic hypotension is a baroreceptor reflex too slow for the patient who just stood up — a fall risk you assess by checking lying and standing pressures. Antihypertensives act on each lever: diuretics on volume, beta-blockers on cardiac output, vasodilators and ACE inhibitors on resistance."},
 {id:"7-4",title:"Lymphatics and immunity — drainage, defense, and memory",mins:8,dia:null,
  cards:["m7-22","m7-23","m7-24","m7-25","m7-26"],
  sections:[
   {h:"The lymphatic system returns the leak",p:"Capillaries leak a few liters of fluid into the tissues every day. The <b>lymphatic system</b> collects that fluid — now called lymph — in blind-ended lymphatic capillaries, filters it through <b>lymph nodes</b> packed with immune cells, and returns it to the bloodstream near the heart. It also absorbs dietary fat from the intestine and houses the lymphoid organs: the thymus (where T cells mature), the spleen (which filters blood and recycles red cells), and the tonsils. Swollen, tender lymph nodes are the nodes doing their job against an infection upstream."},
   {h:"Innate immunity: fast and general",p:"<b>Innate immunity</b> is present from birth and responds the same way to any invader. The first line is barriers — skin, mucous membranes, stomach acid. The second line is <b>inflammation</b>: damaged tissue releases histamine and other signals that dilate vessels and make them leaky, bringing plasma proteins and phagocytes to the site. The cardinal signs — redness, heat, swelling, pain, and loss of function — are the vessels dilating and the fluid arriving. Neutrophils and macrophages phagocytose invaders; natural killer cells destroy infected and cancerous cells; complement proteins and interferons amplify the response; fever raises body temperature to hinder pathogens."},
   {h:"Adaptive immunity: specific and remembered",p:"<b>Adaptive immunity</b> targets a specific invader and remembers it. An <b>antigen</b> is any molecule the immune system recognizes as foreign. <b>B lymphocytes</b> provide humoral immunity: when activated, they become plasma cells that mass-produce <b>antibodies</b>, proteins that bind that specific antigen and mark it for destruction. <b>T lymphocytes</b> provide cell-mediated immunity: helper T cells coordinate the whole response (they are what HIV destroys), and cytotoxic T cells directly kill infected cells. Both leave behind <b>memory cells</b>, so the second exposure to the same antigen produces a faster, stronger response — which is the entire principle of vaccination."}
  ],
  terms:[["Lymph node","Filter station packed with lymphocytes."],["Inflammation","Innate response: dilation, leakiness, phagocyte recruitment."],["Antigen","A molecule the immune system recognizes as foreign."],["B cell / antibody","Humoral immunity; antibodies bind specific antigens."],["Helper T cell","Coordinates the adaptive response; destroyed by HIV."]],
  clinical:"Sepsis is inflammation that has gone systemic — vessels dilate and leak everywhere, pressure collapses, and organs fail; it is why a fever with a fast heart and dropping pressure is treated as an emergency. Allergy is adaptive immunity misfiring at a harmless antigen, and anaphylaxis is that response at full volume. Immunosuppressed patients — chemotherapy, transplant drugs, HIV — lose the defenses in this lesson, which is why every infection-control precaution exists."}
];
LESSONS[8]=[
 {id:"8-1",title:"Breathing — the airway, the alveoli, and how gases move",mins:10,dia:"resptree",
  cards:["m8-1","m8-2","m8-3","m8-4","m8-5","m8-6","m8-7","m8-8","d-resptree-pharynx","d-resptree-larynx","d-resptree-trachea","d-resptree-bronchi","d-resptree-bronchiole","d-resptree-alveoli","d-resptree-diaphragm","d-alveolus-alv","d-alveolus-cap","d-alveolus-memb","d-alveolus-o2","d-alveolus-co2"],
  sections:[
   {h:"The airway, top to bottom",p:"Air enters through the <b>nasal cavity</b>, where it is warmed, moistened, and filtered, passes the <b>pharynx</b> (throat), then the <b>larynx</b> — the voice box, guarded by the <b>epiglottis</b>, which flips down during swallowing to keep food out of the airway. Below it the <b>trachea</b> descends, held open by C-shaped cartilage rings, and splits into a right and left <b>primary bronchus</b>, one per lung. Inside the lungs the bronchi branch again and again into smaller bronchi and then <b>bronchioles</b>, whose walls contain smooth muscle rather than cartilage — which is why they can constrict in asthma. Everything down to the terminal bronchioles is the conducting zone: plumbing that carries air but exchanges no gas."},
   {h:"Alveoli: where the exchange happens",p:"The bronchioles end in clusters of tiny air sacs called <b>alveoli</b> — about 300 million of them, with a combined surface area the size of a tennis court. Each alveolus is wrapped in capillaries, and the <b>respiratory membrane</b> between air and blood is a fraction of a micrometer thick: one alveolar cell, one capillary cell, and their fused basement membranes. Oxygen diffuses across it into the blood and carbon dioxide diffuses out, driven purely by concentration gradients. A thin coating of <b>surfactant</b> lowers surface tension so the alveoli do not collapse on exhalation; premature infants who lack it develop respiratory distress syndrome."},
   {h:"The mechanics of breathing",p:"Breathing is a pressure game. To inhale, the <b>diaphragm</b> contracts and flattens and the external intercostals lift the ribs, enlarging the thoracic cavity; pressure inside the lungs drops below atmospheric pressure and air flows in. Quiet exhalation is passive — the diaphragm relaxes, the elastic lungs and chest wall recoil, pressure rises, and air flows out. Forced exhalation adds the abdominal and internal intercostal muscles. A pneumothorax breaks this system: air leaks into the pleural space, the lung can no longer be pulled open, and it collapses."},
   {h:"Gas transport and the control of breathing",p:"Oxygen travels almost entirely bound to <b>hemoglobin</b>; only a little dissolves in plasma. Carbon dioxide travels mostly as <b>bicarbonate</b> ions in the plasma (about 70%), some bound to hemoglobin, some dissolved. That bicarbonate conversion means CO₂ and blood pH are tied together — more CO₂, more acid. The respiratory center in the <b>medulla</b> sets the rhythm, and its main driver is not oxygen: it is rising CO₂ (sensed as falling pH by central chemoreceptors), which is why holding your breath becomes unbearable long before your oxygen runs low. Oxygen only takes over as the drive when it falls very low, which is a concern in patients with chronic lung disease."}
  ],
  terms:[["Epiglottis","Flap that seals the larynx during swallowing."],["Bronchiole","Small airway with smooth muscle, no cartilage."],["Respiratory membrane","The paper-thin barrier between alveolar air and blood."],["Surfactant","Reduces alveolar surface tension, preventing collapse."],["Central chemoreceptors","Sense rising CO₂ (as falling pH) and drive breathing."]],
  clinical:"Respiratory assessment is this anatomy heard through a stethoscope: wheezes are narrowed bronchioles, crackles are fluid in alveoli, absent sounds are a collapsed or blocked lung. Pulse oximetry reads hemoglobin saturation. In COPD, chronically high CO₂ can blunt the central drive, so giving too much oxygen can suppress breathing — one of the few times oxygen must be titrated carefully."},
 {id:"8-2",title:"The kidney and the nephron — filter everything, then take back what you need",mins:11,dia:"nephron",
  cards:["m8-9","m8-10","m8-11","m8-12","m8-13","m8-14","m8-15","m8-16","d-nephron-glom","d-nephron-bow","d-nephron-pct","d-nephron-loop","d-nephron-dct","d-nephron-cd"],
  sections:[
   {h:"What the kidneys actually do",p:"The kidneys make urine, but that is the least of it. They regulate blood volume and pressure, the concentration of every major electrolyte, and acid–base balance; they release <b>erythropoietin</b> to drive red cell production and <b>renin</b> to raise blood pressure; and they activate vitamin D. Each kidney holds about a million <b>nephrons</b>, and each nephron processes blood the same way: <b>filter</b> almost everything small out of the blood, then <b>reabsorb</b> what the body needs and <b>secrete</b> a little extra waste into what remains. The final product — about 1.5 liters a day out of 180 liters filtered — travels through the ureters to the bladder and out the urethra."},
   {h:"The renal corpuscle: filtration",p:"Blood arrives at each nephron through an afferent arteriole and enters the <b>glomerulus</b>, a tuft of leaky capillaries under high pressure. That pressure forces water and small solutes — glucose, amino acids, ions, urea — out of the blood and into the surrounding cup, the <b>glomerular (Bowman's) capsule</b>. Blood cells and large proteins are too big to pass and stay in the blood, leaving through the efferent arteriole. The fluid in the capsule is now <b>filtrate</b>, and the rate it forms — the <b>glomerular filtration rate (GFR)</b>, about 125 mL/min — is the single best measure of kidney function."},
   {h:"The tubule: reabsorption and secretion",p:"Filtrate then flows through the tubule, and the nephron takes back what it wants. The <b>proximal convoluted tubule</b> does the heavy lifting: it reabsorbs about 65% of the water and sodium and essentially all of the glucose and amino acids. The <b>loop of Henle</b> dips into the salty medulla and back, building the concentration gradient that will let the kidney concentrate urine. The <b>distal convoluted tubule</b> fine-tunes sodium, potassium, calcium, and pH under hormonal control — this is where <b>aldosterone</b> acts, retaining sodium and dumping potassium. The <b>collecting duct</b> makes the final water decision: <b>ADH</b> inserts water channels so water is reabsorbed and urine is concentrated; without ADH, water stays in the tubule and urine is dilute. Along the way, the tubule also <b>secretes</b> hydrogen ions, potassium, and some drugs into the filtrate for excretion."},
   {h:"RAAS: how the kidney raises blood pressure",p:"When blood pressure or sodium delivery to the kidney falls, the kidney releases <b>renin</b>. Renin converts angiotensinogen to angiotensin I; angiotensin-converting enzyme (ACE) in the lungs converts that to <b>angiotensin II</b>, a powerful vasoconstrictor that also triggers <b>aldosterone</b> release from the adrenal cortex. Aldosterone retains sodium, water follows, blood volume rises, and pressure is restored. This <b>renin–angiotensin–aldosterone system</b> is the body's main long-term pressure regulator — and the target of ACE inhibitors, ARBs, and aldosterone blockers, three of the most prescribed drug classes in medicine."}
  ],
  terms:[["Nephron","The functional unit of the kidney."],["Glomerulus","Capillary tuft where filtration occurs."],["GFR","Glomerular filtration rate; the key measure of kidney function."],["Aldosterone","Retains Na⁺ (and water), excretes K⁺ at the distal tubule."],["ADH","Opens water channels in the collecting duct; concentrates urine."]],
  clinical:"Kidney labs are this lesson: creatinine and BUN rise when GFR falls, and estimated GFR stages chronic kidney disease. Urine output is the bedside version — less than 30 mL/hour means the kidneys are not being perfused. Diuretics each target a tubule segment: loop diuretics (furosemide) hit the loop of Henle and are the most powerful; thiazides hit the distal tubule; spironolactone blocks aldosterone and, unlike the others, spares potassium."},
 {id:"8-3",title:"Fluids, electrolytes, and acid–base — the hardest topic, made systematic",mins:11,dia:null,
  cards:["m8-17","m8-18","m8-19","m8-20","m8-21","m8-22","m8-23","m8-24","m8-32"],
  sections:[
   {h:"Where the water is",p:"About 60% of an adult's body weight is water, split into two compartments: roughly two-thirds is <b>intracellular fluid</b> inside cells, and one-third is <b>extracellular fluid</b> — the plasma in the vessels plus the interstitial fluid between cells. Water moves freely between compartments by osmosis, following solute. Sodium is the dominant extracellular ion and potassium the dominant intracellular one, which is why a sodium problem shows up as a fluid-volume problem and a potassium problem shows up as a nerve-and-heart problem."},
   {h:"Three lines of pH defense",p:"Blood pH is held between 7.35 and 7.45 by three systems working at three speeds. <b>Chemical buffers</b> — chiefly the bicarbonate system, plus phosphate and proteins — act within seconds, soaking up or releasing hydrogen ions. The <b>respiratory system</b> acts within minutes: CO₂ is effectively an acid (CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻), so breathing faster blows off CO₂ and raises pH, and breathing slower retains CO₂ and lowers it. The <b>kidneys</b> act over hours to days by excreting hydrogen ions and reabsorbing or generating bicarbonate. They are slow but powerful, and they are the only system that can remove fixed acids."},
   {h:"The four primary disorders",p:"Every acid–base disorder is one of four. <b>Respiratory acidosis</b>: CO₂ retained (hypoventilation — COPD, sedative overdose, airway obstruction); pH falls, CO₂ high. <b>Respiratory alkalosis</b>: CO₂ blown off (hyperventilation — anxiety, pain, high altitude); pH rises, CO₂ low. <b>Metabolic acidosis</b>: bicarbonate lost or acid gained (diabetic ketoacidosis, kidney failure, severe diarrhea, lactic acidosis from shock); pH falls, bicarbonate low. <b>Metabolic alkalosis</b>: acid lost or bicarbonate gained (prolonged vomiting, excessive antacids, some diuretics); pH rises, bicarbonate high."},
   {h:"Reading a blood gas in three steps",p:"Step one: look at the <b>pH</b>. Below 7.35 is acidosis, above 7.45 is alkalosis. Step two: find the culprit. If the abnormal value that <i>explains</i> the pH is the <b>CO₂</b> (high with acidosis or low with alkalosis), the problem is respiratory. If it is the <b>bicarbonate</b> (low with acidosis or high with alkalosis), the problem is metabolic. Step three: check for <b>compensation</b> — the other system trying to correct it. In metabolic acidosis the lungs hyperventilate to blow off CO₂ (the deep, rapid Kussmaul breathing of ketoacidosis); in respiratory acidosis the kidneys slowly retain bicarbonate. Compensation moves the pH back toward normal but rarely all the way."}
  ],
  terms:[["Intracellular / extracellular fluid","Inside cells (~2/3) / plasma + interstitial (~1/3)."],["Bicarbonate buffer","HCO₃⁻ / H₂CO₃; the main blood buffer, linked to lungs and kidneys."],["Respiratory acidosis","Low pH from retained CO₂ (hypoventilation)."],["Metabolic acidosis","Low pH from bicarbonate loss or acid gain."],["Compensation","The unaffected system correcting the pH."]],
  clinical:"This is the topic nursing students fear and NCLEX loves. Anchor it to patients: the COPD patient retaining CO₂ (respiratory acidosis), the anxious hyperventilator (respiratory alkalosis), the diabetic in ketoacidosis breathing deep and fast (metabolic acidosis with respiratory compensation), the patient vomiting for two days (metabolic alkalosis). Learn the three-step read and the disorders stop being memorization."},
 {id:"8-4",title:"Digestion and the liver — breaking food down and absorbing it",mins:8,dia:null,
  cards:["m8-25","m8-26","m8-27","m8-28","m8-29","m8-30","m8-31"],
  sections:[
   {h:"The tube and its helpers",p:"The <b>alimentary canal</b> is one continuous tube: mouth → pharynx → esophagus → stomach → small intestine → large intestine → rectum → anus. Food is pushed along by <b>peristalsis</b>, waves of smooth muscle contraction. The <b>accessory organs</b> sit outside the tube and feed secretions into it: the salivary glands (amylase begins starch digestion), the <b>liver</b> (makes bile), the <b>gallbladder</b> (stores and concentrates bile), and the <b>pancreas</b> (delivers the major digestive enzymes plus bicarbonate to neutralize stomach acid). Digestion is mechanical (chewing, churning) and chemical (enzymes breaking large molecules into absorbable small ones)."},
   {h:"Stomach: storage and acid",p:"The stomach stores a meal, churns it into a paste called chyme, and starts protein digestion. Its lining secretes <b>hydrochloric acid</b>, which kills microbes and activates <b>pepsin</b>, the protein-digesting enzyme, and a thick mucus layer that keeps the acid from digesting the stomach itself. Little is absorbed here except water, alcohol, and some drugs. The stomach also makes <b>intrinsic factor</b>, without which vitamin B12 cannot be absorbed downstream — the basis of pernicious anemia."},
   {h:"Small intestine: where absorption actually happens",p:"Nearly all chemical digestion is completed and nearly all <b>absorption</b> occurs in the small intestine — duodenum, jejunum, ileum. Its surface is folded, covered with finger-like <b>villi</b>, and each villus cell carries <b>microvilli</b>, multiplying the absorptive area enormously. Pancreatic enzymes finish breaking carbohydrates, proteins, and fats apart; <b>bile</b> from the liver <b>emulsifies</b> fats into tiny droplets so the fat-digesting enzyme lipase can reach them — bile is a detergent, not an enzyme. Sugars and amino acids are absorbed into the blood and sent straight to the liver; fats are absorbed into lymphatic vessels. The <b>large intestine</b> then reabsorbs water and electrolytes, hosts the gut bacteria that make vitamin K, and forms and stores feces."},
   {h:"The liver: the body's chemical plant",p:"Everything absorbed from the gut passes through the liver first via the hepatic portal vein. The liver <b>detoxifies</b> drugs and alcohol, <b>makes bile</b>, <b>synthesizes plasma proteins</b> — albumin and most clotting factors — <b>stores glycogen</b>, iron, and vitamins, and converts nutrients between forms as the body needs. When it fails, the consequences follow that list: toxins accumulate (confusion), bile backs up (jaundice), albumin falls (edema and ascites), and clotting factors fall (bleeding)."}
  ],
  terms:[["Peristalsis","Waves of smooth-muscle contraction moving contents along the gut."],["Chyme","The acidic paste the stomach produces."],["Villi / microvilli","Folds that multiply the small intestine's absorptive surface."],["Bile","Liver secretion that emulsifies fat; a detergent, not an enzyme."],["Hepatic portal vein","Carries absorbed nutrients from the gut to the liver."]],
  clinical:"Liver function tests, bilirubin, albumin, and INR together describe how much of this lesson's chemical plant still works, and the classic signs of cirrhosis — jaundice, ascites, easy bruising, confusion — are each a specific liver job failing. Nasogastric tubes, tube feeds, and bowel sounds are all about peristalsis. And because the liver metabolizes most drugs, liver disease changes doses of nearly everything you give."}
];

// ================= storage =================
var LS_KEY="ap-atlas-v1";
var DEFMETA={newPerDay:15, perDay:{}, streak:0, lastStudy:null, rot:{1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1}, done:{}, cur:{lesson:"1-1",step:0}, unlockAll:0, checks:{}};
var store={byId:{}, userCards:[], meta:JSON.parse(JSON.stringify(DEFMETA)), updatedAt:0};
var CARD_LESSON={};
function indexLessons(){ Object.keys(LESSONS).forEach(function(m){ LESSONS[m].forEach(function(L){ L.cards.forEach(function(c){ CARD_LESSON[c]=L.id; }); }); }); }
function lessonDone(id){ return !!(store.meta.done&&store.meta.done[id]); }
function unlockedCard(cid){ if(store.meta.unlockAll) return true; var L=CARD_LESSON[cid]; return !L || lessonDone(L); }
function inRot(m){ return !store.meta.rot || store.meta.rot[m]!==0; }
function toggleRot(m){ if(!store.meta.rot) store.meta.rot={}; store.meta.rot[m]= inRot(m)?0:1; persist(); }
var dbDoc=null, saveTimer=null;

function dkey(d){ d=d||new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function loadLocal(){ try{ var r=localStorage.getItem(LS_KEY); if(r){ var p=JSON.parse(r); if(p&&p.byId){ store.byId=p.byId||{}; store.userCards=p.userCards||[]; store.meta=Object.assign(JSON.parse(JSON.stringify(DEFMETA)),p.meta||{}); store.updatedAt=p.updatedAt||0; } } }catch(e){} }
function saveLocal(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(store)); }catch(e){} }
function persist(){ store.updatedAt=Date.now(); saveLocal();
  if(dbDoc){ clearTimeout(saveTimer); saveTimer=setTimeout(function(){ try{ dbDoc.set(JSON.parse(JSON.stringify(store))).catch(function(){}); }catch(e){} },700); } }
function initDb(){
  if(!(window.claude&&window.claude.use)) return;
  window.claude.use("db").then(function(db){
    if(!db) return;
    dbDoc=db.doc("study/main");
    return dbDoc.get().then(function(snap){
      if(snap&&snap.exists){
        var r=snap.data()||{};
        if((r.updatedAt||0)>(store.updatedAt||0)){
          store.byId=r.byId||{}; store.userCards=r.userCards||[];
          store.meta=Object.assign(JSON.parse(JSON.stringify(DEFMETA)),r.meta||{});
          store.updatedAt=r.updatedAt||0; saveLocal();
        } else if((store.updatedAt||0)>(r.updatedAt||0)){ dbDoc.set(JSON.parse(JSON.stringify(store))).catch(function(){}); }
      } else if(store.updatedAt){ dbDoc.set(JSON.parse(JSON.stringify(store))).catch(function(){}); }
      var el=document.getElementById("syncState"); el.textContent="synced to your account"; el.classList.add("on");
      rerender();
    });
  }).catch(function(){});
}

// ================= scheduler =================
function fresh(){ return {ease:2.5,interval:0,due:0,reps:0,lapses:0,updatedAt:0}; }
function schedule(st,rating,now){
  st=st?Object.assign({},st):fresh();
  var e=st.ease,iv=st.interval,reps=st.reps,lap=st.lapses;
  if(rating==="again"){ e=Math.max(MIN_EASE,e-0.2); if(iv>=1)lap++; return {ease:e,interval:0,due:now+600000,reps:0,lapses:lap,updatedAt:now}; }
  if(iv<1){ if(rating==="easy"){ iv=3; e=Math.min(3.0,e+0.15);} else { iv=1; } }
  else{
    if(rating==="hard"){ iv=Math.max(1,iv*1.2); e=Math.max(MIN_EASE,e-0.15); }
    else if(rating==="good"){ iv=iv*e; }
    else { iv=iv*e*1.3; e=Math.min(3.0,e+0.15); }
  }
  iv=Math.min(iv,365);
  return {ease:e,interval:iv,due:now+Math.round(iv*DAY),reps:reps+1,lapses:lap,updatedAt:now};
}
function fmtIv(st,rating,now){
  if(rating==="again") return "10m";
  var d=schedule(st,rating,now).interval;
  if(d<1) return "1d";
  if(d<30) return Math.round(d)+"d";
  if(d<365) return (Math.round(d/30))+"mo";
  return (Math.round(d/365*10)/10)+"y";
}

// ================= helpers =================
function esc(s){ return String(s).replace(/[&<>"]/g,function(m){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[m];}); }
function mod(id){ for(var i=0;i<MODULES.length;i++) if(MODULES[i].id===id) return MODULES[i]; return MODULES[0]; }
function hueAttr(m){ var o=mod(m); return 'class="hued" style="--mh-l:'+o.hl+';--mh-d:'+o.hd+'"'; }
function allCards(){ return CARDS.concat(store.userCards); }
function stOf(id){ return store.byId[id]; }
function cardsOf(m){ return allCards().filter(function(c){ return c.m===m; }); }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }
function todayRec(){ var k=dkey(); if(!store.meta.perDay[k]) store.meta.perDay[k]={reviews:0,newIntro:0}; return store.meta.perDay[k]; }
function reviewsToday(){ var k=dkey(); return (store.meta.perDay[k]&&store.meta.perDay[k].reviews)||0; }
function newToday(){ var k=dkey(); return (store.meta.perDay[k]&&store.meta.perDay[k].newIntro)||0; }
function newLeft(){ return Math.max(0, store.meta.newPerDay-newToday()); }

function queue(mFilter){
  var now=Date.now(), due=[],learn=[],neu=[];
  allCards().forEach(function(c){
    if(mFilter&&c.m!==mFilter) return;
    var st=stOf(c.id);
    if(!st) neu.push(c);
    else if(st.due<=now){ (st.interval<1?learn:due).push(c); }
  });
  due.sort(function(a,b){return stOf(a.id).due-stOf(b.id).due;});
  learn.sort(function(a,b){return stOf(a.id).due-stOf(b.id).due;});
  // new cards are introduced in module order, and only from modules left in rotation
  neu.sort(function(a,b){ return a.m-b.m || (a.id<b.id?-1:1); });
  var avail;
  if(mFilter){ avail=neu; }
  else { avail=neu.filter(function(c){ return inRot(c.m) && unlockedCard(c.id); }).slice(0,newLeft()); }
  return {due:due, learn:learn, news:avail, all:neu, total:due.length+learn.length+avail.length};
}


// ================= session =================
var session=null;
function startSRS(mFilter){
  var q=queue(mFilter);
  var cards=q.due.concat(q.learn).concat(q.news);
  if(!cards.length){ go("review"); return; }
  session={mode:"srs",cards:cards,idx:0,flipped:false,done:0,total:cards.length,mFilter:mFilter||null,lastRecall:""};
  go("review");
}
function startCram(mFilter,list,label){
  var cards=shuffle(list || (mFilter?cardsOf(mFilter):allCards()));
  if(!cards.length) return;
  session={mode:"cram",cards:cards,idx:0,flipped:false,done:0,got:0,total:cards.length,mFilter:mFilter||null,label:label||null,lastRecall:""};
  go("review");
}
function diaCards(name){ return allCards().filter(function(c){ return c.dia===name; }); }
function cur(){ return session&&session.cards[session.idx]; }
function flip(){ if(!session||session.flipped) return; var rb=document.getElementById("recallBox"); session.lastRecall=rb?rb.value:""; session.flipped=true; renderToday(); }

function grade(rating){
  var c=cur(); if(!c) return; var now=Date.now();
  if(session.mode==="cram"){
    if(rating==="good"||rating==="easy") session.got++;
    session.done++; session.idx++; session.flipped=false; session.lastRecall=""; renderToday(); return;
  }
  var had=!!stOf(c.id);
  store.byId[c.id]=schedule(stOf(c.id),rating,now);
  var rec=todayRec(); rec.reviews++; if(!had) rec.newIntro++;
  bumpStreak(); prune();
  if(store.byId[c.id].interval<1) session.cards.push(c);
  session.done++; session.idx++; session.flipped=false; session.lastRecall="";
  persist(); renderToday(); renderBadge();
}
function bumpStreak(){
  var k=dkey(); if(store.meta.lastStudy===k) return;
  var y=new Date(); y.setDate(y.getDate()-1);
  store.meta.streak = store.meta.lastStudy===dkey(y) ? (store.meta.streak+1) : 1;
  store.meta.lastStudy=k;
}
function prune(){ var ks=Object.keys(store.meta.perDay); if(ks.length>140){ ks.sort(); ks.slice(0,ks.length-140).forEach(function(k){delete store.meta.perDay[k];}); } }


// ================= course model =================
var LESSON_ORDER=[]; Object.keys(LESSONS).map(Number).sort(function(a,b){return a-b;}).forEach(function(m){ LESSONS[m].forEach(function(L){ LESSON_ORDER.push(L.id); }); });
function lessonById(id){ for(var m in LESSONS){ for(var i=0;i<LESSONS[m].length;i++) if(LESSONS[m][i].id===id) return LESSONS[m][i]; } return null; }
function lessonModule(id){ return parseInt(id.split("-")[0],10); }
function lessonIndex(id){ return LESSON_ORDER.indexOf(id); }
function nextLessonId(id){ var i=lessonIndex(id); return i>=0&&i<LESSON_ORDER.length-1 ? LESSON_ORDER[i+1] : null; }
function isUnlocked(id){ if(store.meta.unlockAll) return true; var i=lessonIndex(id); if(i<=0) return true; return lessonDone(LESSON_ORDER[i-1]); }
function firstOpenLesson(){ for(var i=0;i<LESSON_ORDER.length;i++){ if(!lessonDone(LESSON_ORDER[i])) return LESSON_ORDER[i]; } return LESSON_ORDER[LESSON_ORDER.length-1]; }
function curLessonId(){ var c=store.meta.cur&&store.meta.cur.lesson; if(c&&lessonById(c)&&!lessonDone(c)&&isUnlocked(c)) return c; return firstOpenLesson(); }
function cardObj(id){ for(var i=0;i<CARDS.length;i++) if(CARDS[i].id===id) return CARDS[i]; return null; }
function lessonCards(L){ return L.cards.map(cardObj).filter(Boolean); }
function drillCards(L){ return lessonCards(L).filter(function(c){ return c.dia; }); }
function textCards(L){ return lessonCards(L).filter(function(c){ return !c.dia; }); }
function stepsFor(L){ var s=["read"]; if(L.dia&&FIGS[L.dia]) s.push("see"); if(has3d(L)) s.push("explore"); s.push("check"); if(drillCards(L).length) s.push("drill"); s.push("done"); return s; }
function curStep(L){ var c=store.meta.cur||{}; return c.lesson===L.id ? Math.min(c.step||0, stepsFor(L).length-1) : 0; }
function setCur(id,step){ store.meta.cur={lesson:id,step:step}; persist(); }
function markDone(id){ if(!store.meta.done) store.meta.done={}; store.meta.done[id]=Date.now(); persist(); }
function moduleProgress(m){ var Ls=LESSONS[m]||[], d=Ls.filter(function(L){return lessonDone(L.id);}).length; return {done:d,total:Ls.length,pct:Ls.length?Math.round(d/Ls.length*100):0}; }
function courseProgress(){ var d=LESSON_ORDER.filter(lessonDone).length; return {done:d,total:LESSON_ORDER.length,pct:Math.round(d/LESSON_ORDER.length*100)}; }
var STEP_LABEL={read:"Read",see:"See the plate",explore:"Explore in 3D",check:"Check yourself",drill:"Drill labels",done:"Complete"};

// ================= routing =================
var route={view:"home",lesson:null,ref:null};
var views={};
function go(view,arg){
  if(view!=="review" && view!=="lesson") session=null;
  if(view==="lesson"){ route.lesson=arg||curLessonId(); }
  if(view==="reference"){ route.ref=arg||"plates"; }
  if(view==="atlas"||view==="joints"){ route.ref=arg||null; }
  route.view=view;
  document.getElementById("side").classList.remove("open"); document.getElementById("scrim").classList.remove("on");
  rerender(); window.scrollTo(0,0);
}
function rerender(){
  kill3d(); renderBadge(); renderOutline();
  Array.prototype.forEach.call(document.querySelectorAll(".navbtn"),function(b){ b.setAttribute("aria-current", b.getAttribute("data-view")===route.view || (route.view==="lesson"&&b.getAttribute("data-view")==="course") ? "true":"false"); });
  var main=document.getElementById("main"); main.innerHTML="";
  var v=document.createElement("div"); v.className="view"; main.appendChild(v);
  ({home:renderHome,course:renderCourse,lesson:renderLesson,review:renderReview,progress:renderProgress,reference:renderReference,atlas:renderAtlas,joints:renderJoints})[route.view](v);
}
function crumb(html){ document.getElementById("crumb").innerHTML=html; }
function renderBadge(){ var t=queue(null).total; var b=document.getElementById("dueBadge"); b.textContent=t; b.style.display=t?"":"none"; }
function renderToday(){ if(session&&session.inLesson){ renderLesson(document.querySelector("#main .view")); } else { rerender(); } }
function hueStyle(m){ var o=mod(m); return 'style="--mh-l:'+o.hl+';--mh-d:'+o.hd+'"'; }

// ================= sidebar outline =================
var openMod=null;
function renderOutline(){
  var host=document.getElementById("outline"); var cur=curLessonId(); var curM=lessonModule(route.lesson||cur);
  if(openMod===null) openMod=curM;
  var h='<div class="eyebrow">Course outline</div>';
  MODULES.forEach(function(m){
    var pr=moduleProgress(m.id);
    h+='<div class="omod hued '+(openMod===m.id?"open":"")+'" '+hueStyle(m.id)+'><button data-om="'+m.id+'"><span class="dot"></span><span>'+esc(m.name)+'</span><span class="pct">'+pr.done+'/'+pr.total+'</span><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg></button><div class="olist">';
    (LESSONS[m.id]||[]).forEach(function(L){
      var done=lessonDone(L.id), unl=isUnlocked(L.id), isCur=(route.view==="lesson"&&route.lesson===L.id);
      h+='<button class="oles '+(done?"done":"")+' '+(L.id===cur&&!done?"cur":"")+' '+(!unl&&!done?"locked":"")+'" data-ol="'+L.id+'" '+(isCur?'aria-current="true"':'')+' '+(!unl&&!done?'disabled':'')+'><span class="st"></span><span>'+esc(L.title.split(" — ")[0])+'</span></button>';
    });
    h+='</div></div>';
  });
  host.innerHTML=h;
  Array.prototype.forEach.call(host.querySelectorAll("[data-om]"),function(b){ b.onclick=function(){ var m=parseInt(b.getAttribute("data-om"),10); openMod = openMod===m ? -1 : m; renderOutline(); }; });
  Array.prototype.forEach.call(host.querySelectorAll("[data-ol]"),function(b){ if(!b.disabled) b.onclick=function(){ go("lesson", b.getAttribute("data-ol")); }; });
}

// ================= HOME =================
function renderHome(v){
  crumb('<b>Home</b>');
  var id=curLessonId(), L=lessonById(id), m=mod(lessonModule(id)), q=queue(null), cp=courseProgress();
  var steps=stepsFor(L), st=curStep(L), started=(store.meta.cur&&store.meta.cur.lesson===id&&st>0);
  var h='<div class="hero hued" '+hueStyle(m.id)+'><span class="ghost">'+String(m.id).padStart(2,"0")+'</span>'+
    '<div class="eyebrow" style="color:var(--mh)">'+(started?"Continue where you left off":(cp.done===0?"Start the course":"Next lesson"))+' · '+esc(m.name)+'</div>'+
    '<h1>'+esc(L.title)+'</h1>'+
    '<p>'+(started?'You are on <b>'+STEP_LABEL[steps[st]]+'</b>. Pick up right there.':'About '+L.mins+' minutes: read the lesson, study the real plate, check yourself, then drill the labels. Its cards enter your daily reviews when you finish.')+'</p>'+
    '<div class="row"><button class="btn primary big" id="hGo">'+(started?"Continue lesson":"Start lesson")+' →</button><button class="btn" id="hCourse">See the whole course</button></div>'+
    '<div class="stepmini">'+steps.map(function(s,i){ return '<i class="'+(i<st?"on":(i===st&&started?"on":""))+'"></i>'; }).join("")+'<span style="margin-left:6px">'+(st+ (started?1:0))+' / '+steps.length+' steps</span></div></div>';
  h+='<div class="grid2">';
  h+='<div class="card"><h3>Today\'s review</h3><p>'+(q.total? '<b>'+q.total+'</b> card'+(q.total===1?"":"s")+' ready — '+q.due.length+' due, '+q.learn.length+' learning, '+q.news.length+' new from lessons you\'ve finished.' : 'Nothing due right now. Finishing a lesson unlocks its cards into this queue.')+'</p><button class="btn '+(q.total?"primary":"")+'" id="hReview" '+(q.total?'':'disabled')+'>Review now</button></div>';
  h+='<div class="card"><h3>Progress</h3><div class="kpi"><div><span class="k">Streak</span><span class="v">'+store.meta.streak+' <small>day'+(store.meta.streak===1?"":"s")+'</small></span></div><div><span class="k">Lessons</span><span class="v">'+cp.done+' <small>/ '+cp.total+'</small></span></div><div><span class="k">Reviews today</span><span class="v">'+reviewsToday()+'</span></div></div><div class="bar" style="margin-top:14px"><i style="width:'+cp.pct+'%"></i></div></div>';
  h+='</div>';
  v.innerHTML=h;
  document.getElementById("hGo").onclick=function(){ go("lesson",id); };
  document.getElementById("hCourse").onclick=function(){ go("course"); };
  var hr=document.getElementById("hReview"); if(!hr.disabled) hr.onclick=function(){ startSRS(null); };
}

// ================= COURSE PATH =================
function renderCourse(v){
  crumb('<b>Course</b> · 8 modules · '+LESSON_ORDER.length+' lessons');
  var cur=curLessonId(), cp=courseProgress();
  var h='<div style="margin-bottom:20px"><div class="eyebrow">The path</div><h1 style="font-size:1.7rem;margin-top:4px">Anatomy &amp; Physiology, in order</h1><p style="color:var(--muted);max-width:66ch;margin:8px 0 0">Lessons unlock one after another, and each one feeds its cards into your daily reviews when you complete it. That is the whole structure: learn it, prove it, then let the schedule keep it alive. '+cp.done+' of '+cp.total+' done.</p></div>';
  MODULES.forEach(function(m){
    var pr=moduleProgress(m.id);
    h+='<div class="pathmod hued" '+hueStyle(m.id)+'><div class="mhead"><span class="num">MODULE '+String(m.id).padStart(2,"0")+'</span><h2>'+esc(m.name)+'</h2><span class="num" style="color:var(--faint)">'+esc(m.ch)+'</span>'+
       (pr.done>0?'<div class="acts"><button class="btn" data-cram="'+m.id+'">Cram module</button><button class="btn" data-quiz="'+m.id+'">Quiz</button></div>':'')+'</div>';
    (LESSONS[m.id]||[]).forEach(function(L,i){
      var done=lessonDone(L.id), unl=isUnlocked(L.id), isCur=(L.id===cur&&!done);
      h+='<div class="lesrow '+(done?"done":"")+' '+(isCur?"cur":"")+' '+(!unl&&!done?"locked":"")+'" data-les="'+L.id+'"><span class="st">'+(done?"✓":(i+1))+'</span><div class="t"><b>'+esc(L.title)+'</b><span>'+L.mins+' min · '+L.cards.length+' cards'+(L.dia?' · plate: '+esc(DIAGRAMS[L.dia].title):'')+'</span></div><span class="go">'+(done?"Review":(isCur?"Continue →":(unl?"Start →":"Locked")))+'</span></div>';
    });
    h+='</div>';
  });
  v.innerHTML=h;
  Array.prototype.forEach.call(v.querySelectorAll(".lesrow:not(.locked)"),function(r){ r.onclick=function(){ go("lesson", r.getAttribute("data-les")); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-cram]"),function(b){ b.onclick=function(e){ e.stopPropagation(); startCram(parseInt(b.getAttribute("data-cram"),10)); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-quiz]"),function(b){ b.onclick=function(e){ e.stopPropagation(); startQuizIn(parseInt(b.getAttribute("data-quiz"),10)); }; });
}

// ================= LESSON PLAYER =================
var check=null;
function renderLesson(v){
  kill3d(); v = v || document.querySelector("#main .view");
  var id=route.lesson||curLessonId(), L=lessonById(id); if(!L){ go("course"); return; }
  if(!isUnlocked(id)&&!lessonDone(id)){ go("course"); return; }
  var m=mod(lessonModule(id)), steps=stepsFor(L), st=curStep(L), step=steps[st], done=lessonDone(id);
  crumb('<b>'+esc(m.name)+'</b> · Lesson '+id+' · '+STEP_LABEL[step]);
  var h='<div class="hued" '+hueStyle(m.id)+'>';
  h+='<div class="stepper">'+steps.map(function(s,i){ return '<div class="step '+(i<st?"done":(i===st?"cur":""))+'"><i></i><span>'+STEP_LABEL[s]+'</span></div>'; }).join("")+'</div>';
  h+='<div class="lhead"><div class="eyebrow" style="color:var(--mh)">Module '+String(m.id).padStart(2,"0")+' · '+esc(m.name)+'</div><h1>'+esc(L.title)+'</h1><div class="meta"><span>'+L.mins+' min read</span><span>'+L.cards.length+' cards</span>'+(done?'<span style="color:var(--good)">completed</span>':'')+'</div></div>';
  var body='';
  if(step==="read"){
    body+='<div class="prose">';
    L.sections.forEach(function(s){ body+='<h2>'+esc(s.h)+'</h2><p>'+s.p+'</p>'; });
    body+='</div><div class="eyebrow" style="margin-top:28px">Key terms</div><div class="terms">'+L.terms.map(function(t){ return '<div class="term"><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></div>'; }).join("")+'</div>';
    body+='<div class="clinical"><div class="eyebrow">Why this matters at the bedside</div><p>'+L.clinical+'</p></div>';
    body+='<div class="lnav"><button class="btn ghost" id="lBack">← Course</button><button class="btn primary big" id="lNext">'+(steps[st+1]==="see"?"See the plate":(steps[st+1]==="explore"?"Explore in 3D":"Check yourself"))+' →</button></div>';
  }
  else if(step==="see"){
    var d=DIAGRAMS[L.dia], f=FIGS[L.dia];
    body+='<p style="color:var(--muted);max-width:66ch;margin:0 0 14px">Study the real plate. Read each label and find it on the figure — say what it does out loud. The drill at the end of this lesson will blank these labels and ask you for them.</p>';
    body+='<div class="see-figwrap"><img src="'+f.src+'" alt="'+esc(f.title)+'"></div><div class="figcap"><b>'+esc(f.title)+'</b><span>OpenStax A&amp;P 2e · '+esc(f.fig)+' · CC BY 4.0</span></div>';
    if(L.dia==="heart" && FIGS.heart_chordae) body+='<div class="see-figwrap" style="margin-top:14px"><img src="'+FIGS.heart_chordae.src+'" alt=""></div><div class="figcap"><b>'+esc(FIGS.heart_chordae.title)+'</b><span>OpenStax A&amp;P 2e · '+esc(FIGS.heart_chordae.fig)+'</span></div>';
    body+='<div class="eyebrow" style="margin-top:18px">Structures you will be asked to name</div><div class="partlist">'+d.parts.map(function(p){ return '<div class="partitem"><b>'+esc(p.label)+'</b><span>'+esc(p.desc)+'</span></div>'; }).join("")+'</div>';
    body+='<button class="schemtoggle" id="schemBtn">Show simplified schematic</button><div class="schem" id="schemBox" hidden>'+diaSVG(L.dia,null,true)+'</div>';
    body+='<div class="lnav"><button class="btn ghost" id="lPrev">← Back to reading</button><button class="btn primary big" id="lNext">'+(steps[st+1]==="explore"?"Explore in 3D":"Check yourself")+' →</button></div>';
  }
  else if(step==="explore"){ body+=render3dStep(L); }
  else if(step==="check"){
    if(!check||check.lesson!==id) check=buildCheck(L);
    body+=renderCheck(L);
  }
  else if(step==="drill"){
    if(!session||session.inLesson!==id){
      var dc=shuffle(drillCards(L));
      session={mode:"cram",cards:dc,idx:0,flipped:false,done:0,got:0,total:dc.length,mFilter:null,label:DIAGRAMS[L.dia]?DIAGRAMS[L.dia].title:"Labels",lastRecall:"",inLesson:id};
    }
    if(session.idx>=session.cards.length){
      body+='<div class="donebox"><div class="big">Labels drilled</div><p>'+session.got+' of '+session.done+' felt solid. Those you missed will come back on schedule once this lesson\'s cards enter your reviews.</p><div class="row"><button class="btn" id="lRedo">Drill again</button><button class="btn primary big" id="lNext">Finish lesson →</button></div></div>';
    } else {
      body+='<p style="color:var(--muted);max-width:66ch;margin:0 0 12px">Practical-exam mode: the plate with every label blanked. Name the highlighted one from memory, then reveal.</p><div id="drillHost"></div>';
    }
  }
  else if(step==="done"){
    if(!done){ markDone(id); }
    var nx=nextLessonId(id), q=queue(null);
    body+='<div class="donebox"><div class="eyebrow" style="color:var(--mh)">Lesson complete</div><div class="big">'+esc(L.title.split(" — ")[0])+'</div><p>'+L.cards.length+' cards from this lesson are now in your daily review rotation. The scheduler will bring each one back right before you would forget it — that is where the real memorization happens.</p>'+
      '<div class="unlock">✓ '+L.cards.length+' cards unlocked · '+q.total+' ready to review now</div>'+
      '<div class="row">'+(q.total?'<button class="btn" id="lReview">Review now</button>':'')+(nx?'<button class="btn primary big" id="lNextLesson">Next: '+esc(lessonById(nx).title.split(" — ")[0])+' →</button>':'<button class="btn primary big" id="lCourseEnd">Back to course</button>')+'</div></div>';
  }
  h+=body+'</div>';
  v.innerHTML=h;
  // bindings
  var b;
  if((b=document.getElementById("lBack"))) b.onclick=function(){ go("course"); };
  if((b=document.getElementById("lPrev"))) b.onclick=function(){ setCur(id,Math.max(0,st-1)); renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("lNext"))) b.onclick=function(){ setCur(id,st+1); check=null; if(steps[st+1]!=="drill") session=null; renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("schemBtn"))) b.onclick=function(){ var el=document.getElementById("schemBox"); el.hidden=!el.hidden; b.textContent=el.hidden?"Show simplified schematic":"Hide schematic"; };
  if((b=document.getElementById("lRedo"))) b.onclick=function(){ session=null; renderLesson(); };
  if((b=document.getElementById("lReview"))) b.onclick=function(){ startSRS(null); };
  if((b=document.getElementById("lNextLesson"))) b.onclick=function(){ setCur(nx,0); check=null; session=null; go("lesson",nx); };
  if((b=document.getElementById("lCourseEnd"))) b.onclick=function(){ go("course"); };
  if(step==="check") bindCheck(L);
  if(step==="explore") after3dRender(L);
  if(step==="drill" && session && session.idx<session.cards.length) renderSessionCard(document.getElementById("drillHost"));
  renderOutline();
}

// ---- check (mini quiz) ----
function buildCheck(L){
  var pool=textCards(L);
  if(pool.length<4){ var extra=cardsOf(lessonModule(L.id)).filter(function(c){ return !c.dia && pool.indexOf(c)<0; }); pool=pool.concat(shuffle(extra).slice(0,4-pool.length)); }
  var picks=shuffle(pool).slice(0,Math.min(5,pool.length));
  var modPool=cardsOf(lessonModule(L.id)).filter(function(c){return !c.dia;});
  var qs=picks.map(function(c){
    var ds=shuffle(modPool.filter(function(x){return x.id!==c.id;})).slice(0,3).map(function(x){return x.a;});
    var opts=shuffle([c.a].concat(ds));
    return {card:c,opts:opts,ans:opts.indexOf(c.a),picked:null};
  });
  return {lesson:L.id,qs:qs,idx:0,score:0,need:Math.ceil(qs.length*0.7)};
}
function renderCheck(L){
  var c=check;
  if(c.idx>=c.qs.length){
    var pass=c.score>=c.need;
    if(pass){ if(!store.meta.checks) store.meta.checks={}; store.meta.checks[L.id]=Math.max(store.meta.checks[L.id]||0,c.score); persist(); }
    return '<div class="donebox"><div class="eyebrow" style="color:'+(pass?"var(--good)":"var(--again)")+'">'+(pass?"Passed":"Not yet")+'</div><div class="big">'+c.score+' of '+c.qs.length+'</div><p>'+(pass?'Good — you\'ve got the core of this lesson. Now drill the labels so the anatomy sticks too.':'You need '+c.need+' to move on. Go back and re-read the parts you missed, then try a fresh set.')+'</p>'+
      '<div class="row">'+(pass?'<button class="btn primary big" id="lNext">'+(stepsFor(L)[curStep(L)+1]==="drill"?"Drill the labels":"Finish lesson")+' →</button>':'<button class="btn" id="ckBack">Re-read lesson</button><button class="btn primary" id="ckRetry">Try again</button>')+'</div></div>';
  }
  var q=c.qs[c.idx];
  var h='<div class="queuebar"><span class="qtag"><b>Question '+(c.idx+1)+'</b> of '+c.qs.length+'</span><span class="sessprog"><span class="mono" style="font-size:.72rem">'+c.score+' correct · need '+c.need+'</span><span class="track"><i style="width:'+(c.idx/c.qs.length*100)+'%"></i></span></span></div>';
  h+='<div class="scard hued"><div class="ctop"><span class="modtag">Check yourself</span><span class="kind">no scheduling — just a check</span></div><div class="body"><div class="qtext">'+esc(q.card.q)+'</div><div class="qopts">';
  q.opts.forEach(function(o,i){ var cls="qopt",dis=""; if(q.picked!==null){ dis=" disabled"; if(i===q.ans) cls+=" correct"; else if(i===q.picked) cls+=" wrong"; } h+='<button class="'+cls+'" data-o="'+i+'"'+dis+'><span class="ltr">'+String.fromCharCode(65+i)+'</span><span>'+esc(o)+'</span></button>'; });
  h+='</div></div><div class="actions">'+(q.picked!==null?'<button class="btn primary" id="ckNext" style="width:100%">'+(c.idx===c.qs.length-1?"See result":"Next")+'</button>':'')+'</div></div>';
  return h;
}
function bindCheck(L){
  var c=check, b;
  Array.prototype.forEach.call(document.querySelectorAll(".qopt"),function(o){ if(o.disabled) return; o.onclick=function(){ var i=parseInt(o.getAttribute("data-o"),10); var q=c.qs[c.idx]; q.picked=i; if(i===q.ans) c.score++; renderLesson(); }; });
  if((b=document.getElementById("ckNext"))) b.onclick=function(){ c.idx++; renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("ckRetry"))) b.onclick=function(){ check=buildCheck(L); renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("ckBack"))) b.onclick=function(){ check=null; setCur(L.id,0); renderLesson(); window.scrollTo(0,0); };
}

// ================= shared study card =================
function rb(r,lab,iv,k){ return '<button class="ratebtn '+r+'" data-r="'+r+'"><span class="lab">'+lab+'</span>'+(iv?'<span class="iv">'+iv+'</span>':'')+'<span class="key">'+k+'</span></button>'; }
function renderSessionCard(host){
  var c=cur(), st=stOf(c.id), m=mod(c.m), stage=c.dia&&hasStage(c.dia,c.part);
  var kind = session.mode==="cram" ? "drill" : (!st?"new":(st.interval<1?"learning":"review"));
  var h='<div class="scard hued" '+hueStyle(m.id)+'><div class="ctop"><span class="modtag">'+esc(m.name)+'</span><span class="kind">'+(c.dia?"label · ":"")+kind+'</span></div><div class="body">';
  if(stage){ var sp=FIGMAP[c.dia].spots[c.part]; h+='<div class="qtext sm">'+(sp.src==="label"?"What belongs on the blank label?":"Identify the highlighted structure.")+'</div>'+figStage(c.dia,c.part,!session.flipped); if(!session.flipped) h+='<div class="stagehint">real textbook plate · every label blanked · leader lines intact</div>'; }
  else if(c.dia){ h+='<div class="qtext sm">'+esc(c.q)+'</div>'+diaSVG(c.dia,c.part,session.flipped,"diacard"); }
  else { h+='<div class="qtext">'+esc(c.q)+'</div>'; }
  if(!session.flipped){ h+='<div class="recall"><label>Answer from memory first</label><textarea id="recallBox" placeholder="Say it out loud or type it — then reveal."></textarea></div>'; }
  else { h+='<div class="divider"></div><div class="atext"><span class="lead">Answer</span>'+esc(c.a)+'</div>'; if((session.lastRecall||"").trim()) h+='<div class="yours"><b>What you wrote</b>'+esc(session.lastRecall.trim())+'</div>'; if(c.dia&&FIGS[c.dia]&&!stage) h+='<div class="figcard">'+figHTML(c.dia)+'</div>'; }
  h+='</div><div class="actions">';
  if(!session.flipped) h+='<button class="showbtn" id="showBtn">Show answer <span class="mono" style="opacity:.65;font-size:.78rem">space</span></button>';
  else if(session.mode==="cram") h+='<div class="rate" style="grid-template-columns:1fr 1fr">'+rb("again","Missed it","","1")+rb("good","Got it","","3")+'</div>';
  else { var now=Date.now(); h+='<div class="rate">'+rb("again","Again",fmtIv(st,"again",now),"1")+rb("hard","Hard",fmtIv(st,"hard",now),"2")+rb("good","Good",fmtIv(st,"good",now),"3")+rb("easy","Easy",fmtIv(st,"easy",now),"4")+'</div>'; }
  h+='</div></div>';
  host.innerHTML=h;
  if(!session.flipped){ document.getElementById("showBtn").onclick=flip; var r=document.getElementById("recallBox"); if(r) r.focus(); }
  else Array.prototype.forEach.call(host.querySelectorAll(".ratebtn"),function(b){ b.onclick=function(){ grade(b.getAttribute("data-r")); }; });
}

// ================= REVIEW (daily SRS) =================
function renderReview(v){
  crumb('<b>Review</b>');
  var q=queue(null);
  var h='';
  if(session && !session.inLesson){
    var pct=Math.round(session.done/Math.max(1,session.total)*100);
    h+='<div class="queuebar"><span class="qtag"><b>'+(session.mode==="cram"?"Cram":"Review")+'</b>'+(session.label?' · '+esc(session.label):(session.mFilter?' · '+esc(mod(session.mFilter).name):''))+'</span><span class="sessprog"><span class="mono" style="font-size:.72rem">'+session.done+' / '+session.total+'</span><span class="track"><i style="width:'+Math.min(100,pct)+'%"></i></span></span></div>';
    if(session.idx>=session.cards.length){
      var d=session.done, wasCram=session.mode==="cram", got=session.got; var again=queue(null).total; session=null;
      h+='<div class="empty"><div class="big">'+(wasCram?"Cram complete":"Session complete")+'</div><p>'+(wasCram?'You drilled <b>'+d+'</b> — <b>'+got+'</b> felt solid. Cram never touches your schedule.':'You reviewed <b>'+d+'</b> card'+(d===1?"":"s")+'. The scheduler takes it from here.')+'</p><div class="row">'+(again?'<button class="btn primary" id="rvMore">Keep going ('+again+')</button>':'')+'<button class="btn" id="rvHome">Home</button></div></div>';
      v.innerHTML=h; var b; if((b=document.getElementById("rvMore"))) b.onclick=function(){ startSRS(null); }; document.getElementById("rvHome").onclick=function(){ go("home"); }; return;
    }
    h+='<div id="cardHost"></div><p class="hint">Retrieve <em>before</em> you flip. "Again" isn\'t failure — it\'s the system finding the gap.</p>';
    v.innerHTML=h; renderSessionCard(document.getElementById("cardHost")); return;
  }
  h+='<div class="queuebar"><span class="qtag due"><span class="d"></span>Due <b>'+q.due.length+'</b></span><span class="qtag learn"><span class="d"></span>Learning <b>'+q.learn.length+'</b></span><span class="qtag new"><span class="d"></span>New <b>'+q.news.length+'</b></span></div>';
  if(q.total){
    var srcM=[]; q.news.forEach(function(c){ if(srcM.indexOf(c.m)<0) srcM.push(c.m); });
    h+='<div class="empty"><div class="big">'+(q.due.length||q.learn.length?"Ready when you are":"First session")+'</div><p><b>'+q.due.length+'</b> coming back today, <b>'+q.learn.length+'</b> still learning, <b>'+q.news.length+'</b> new'+(srcM.length?' from '+esc(srcM.map(function(x){return mod(x).name;}).join(" · ")):'')+'. New cards come only from lessons you\'ve completed.</p><div class="row"><button class="btn primary big" id="rvStart">Start session</button><button class="btn" id="rvCram">Cram everything unlocked</button></div>'+miniStats()+'</div>';
  } else {
    var locked=allCards().filter(function(c){ return !stOf(c.id) && !unlockedCard(c.id); }).length;
    h+='<div class="empty"><div class="big">All caught up</div><p>Nothing is due. '+(locked?locked+' cards are still locked behind lessons you haven\'t finished — the course is how you unlock them.':'Come back tomorrow to keep the streak.')+'</p><p class="mono" style="font-size:.76rem;color:var(--faint)">'+nextDue()+'</p><div class="row"><button class="btn primary" id="rvLesson">Continue the course</button></div>'+miniStats()+'</div>';
  }
  v.innerHTML=h; var b;
  if((b=document.getElementById("rvStart"))) b.onclick=function(){ startSRS(null); };
  if((b=document.getElementById("rvCram"))) b.onclick=function(){ startCram(null, allCards().filter(function(c){return unlockedCard(c.id);}), "Everything unlocked"); };
  if((b=document.getElementById("rvLesson"))) b.onclick=function(){ go("lesson"); };
}
function miniStats(){ var all=allCards(),mast=0,started=0; all.forEach(function(c){ var s=stOf(c.id); if(s){started++; if(s.interval>=21) mast++;} }); return '<div class="mono" style="display:flex;gap:22px;justify-content:center;flex-wrap:wrap;margin-top:20px;padding-top:16px;border-top:1px solid var(--line-soft);font-size:.74rem;color:var(--faint)"><span><b style="color:var(--ink)">'+store.meta.streak+'</b> day streak</span><span><b style="color:var(--ink)">'+started+'</b> / '+all.length+' cards started</span><span><b style="color:var(--ink)">'+mast+'</b> mastered</span></div>'; }
function nextDue(){ var now=Date.now(),min=Infinity; allCards().forEach(function(c){ var s=stOf(c.id); if(s&&s.due>now&&s.due<min) min=s.due; }); if(min===Infinity) return "No cards scheduled yet."; var h=(min-now)/3600000; return h<24?"Next card due in about "+Math.max(1,Math.round(h))+" hour"+(Math.round(h)===1?"":"s")+".":"Next review in about "+Math.round(h/24)+" day"+(Math.round(h/24)===1?"":"s")+"."; }

// module quiz (from course page) — reuse check machinery in review view
var quiz=null;
function startQuizIn(m){
  var pool=cardsOf(m).filter(function(c){return unlockedCard(c.id)||stOf(c.id);}); if(pool.length<4) pool=cardsOf(m);
  var picks=shuffle(pool).slice(0,10);
  var qs=picks.map(function(c){ var dp=(c.dia?allCards().filter(function(x){return x.dia===c.dia&&x.id!==c.id;}):cardsOf(m).filter(function(x){return x.id!==c.id&&!x.dia;})); if(dp.length<3) dp=allCards().filter(function(x){return x.id!==c.id;}); var opts=shuffle([c.a].concat(shuffle(dp).slice(0,3).map(function(x){return x.a;}))); return {card:c,opts:opts,ans:opts.indexOf(c.a),picked:null}; });
  quiz={qs:qs,idx:0,score:0,m:m}; route.view="review"; session=null; renderQuizView();
}
function renderQuizView(){
  var main=document.getElementById("main"); main.innerHTML=""; var v=document.createElement("div"); v.className="view"; main.appendChild(v);
  crumb('<b>Quiz</b> · '+esc(mod(quiz.m).name));
  if(quiz.idx>=quiz.qs.length){
    var missed=quiz.qs.filter(function(q){return q.picked!==q.ans;}), pct=Math.round(quiz.score/quiz.qs.length*100);
    v.innerHTML='<div class="empty"><div class="big">'+quiz.score+' of '+quiz.qs.length+' · '+pct+'%</div><p>'+(pct>=80?"Solid.":"The misses below are exactly what to drill next.")+'</p>'+(missed.length?'<div class="browse" style="text-align:left;margin-top:18px">'+missed.map(function(q){return '<div class="brow"><div class="qq">'+esc(q.card.q)+'</div><div class="aa">'+esc(q.card.a)+'</div></div>';}).join("")+'</div>':'')+'<div class="row">'+(missed.length?'<button class="btn primary" id="qzSend">Send '+missed.length+' missed to review</button>':'')+'<button class="btn" id="qzDone">Back to course</button></div></div>';
    var b; if((b=document.getElementById("qzSend"))) b.onclick=function(){ var now=Date.now(); missed.forEach(function(q){ var s=stOf(q.card.id)||fresh(); store.byId[q.card.id]=Object.assign({},s,{interval:0,due:now,ease:Math.max(MIN_EASE,(s.ease||2.5)-0.15),updatedAt:now}); }); persist(); renderBadge(); b.textContent="Added ✓"; b.disabled=true; };
    document.getElementById("qzDone").onclick=function(){ quiz=null; go("course"); }; return;
  }
  var q=quiz.qs[quiz.idx], m=mod(q.card.m), stage=q.card.dia&&hasStage(q.card.dia,q.card.part);
  var h='<div class="queuebar"><span class="qtag"><b>Question '+(quiz.idx+1)+'</b> of '+quiz.qs.length+'</span><span class="sessprog"><span class="mono" style="font-size:.72rem">'+quiz.score+' correct</span><span class="track"><i style="width:'+(quiz.idx/quiz.qs.length*100)+'%"></i></span></span></div>';
  h+='<div class="scard hued" '+hueStyle(m.id)+'><div class="ctop"><span class="modtag">'+esc(m.name)+'</span><span class="kind">quiz</span></div><div class="body"><div class="qtext'+(q.card.dia?' sm':'')+'">'+(stage?(FIGMAP[q.card.dia].spots[q.card.part].src==="label"?"What belongs on the blank label?":"Identify the highlighted structure."):esc(q.card.q))+'</div>'+(q.card.dia?(stage?figStage(q.card.dia,q.card.part,q.picked===null):diaSVG(q.card.dia,q.card.part,q.picked!==null,"diacard")):'')+'<div class="qopts">';
  q.opts.forEach(function(o,i){ var cls="qopt",dis=""; if(q.picked!==null){ dis=" disabled"; if(i===q.ans) cls+=" correct"; else if(i===q.picked) cls+=" wrong"; } h+='<button class="'+cls+'" data-o="'+i+'"'+dis+'><span class="ltr">'+String.fromCharCode(65+i)+'</span><span>'+esc(o)+'</span></button>'; });
  h+='</div></div><div class="actions">'+(q.picked!==null?'<button class="btn primary" id="qzNext" style="width:100%">'+(quiz.idx===quiz.qs.length-1?"See results":"Next")+'</button>':'')+'</div></div>';
  v.innerHTML=h;
  Array.prototype.forEach.call(v.querySelectorAll(".qopt"),function(o){ if(o.disabled) return; o.onclick=function(){ var i=parseInt(o.getAttribute("data-o"),10); q.picked=i; if(i===q.ans) quiz.score++; renderQuizView(); }; });
  var nb=document.getElementById("qzNext"); if(nb) nb.onclick=function(){ quiz.idx++; renderQuizView(); window.scrollTo(0,0); };
}

// ================= PROGRESS =================
function renderProgress(v){
  crumb('<b>Progress</b>');
  var now=Date.now(), all=allCards(), total=all.length, mast=0, seen=0, neu=0; all.forEach(function(c){ var s=stOf(c.id); if(!s) neu++; else if(s.interval>=21) mast++; else seen++; });
  var cp=courseProgress();
  var h='<h1 style="font-size:1.6rem;margin-bottom:16px">Your progress</h1>';
  h+='<div class="statgrid">'+sbox("Day streak",store.meta.streak,store.meta.streak===1?"day":"days")+sbox("Lessons done",cp.done,'<small>/ '+cp.total+'</small>')+sbox("Cards started",total-neu,'<small>/ '+total+'</small>')+sbox("Mastered",mast,'<small>21d+</small>')+'</div>';
  // heat
  var days=84, end=new Date(); end.setHours(0,0,0,0); var start=new Date(end); start.setDate(start.getDate()-(days-1)); var hh=''; for(var p=0;p<start.getDay();p++) hh+='<i style="visibility:hidden"></i>';
  for(var i=0;i<days;i++){ var d=new Date(start); d.setDate(start.getDate()+i); var rec=store.meta.perDay[dkey(d)], n=rec?rec.reviews:0; var l=n===0?0:n<=5?1:n<=15?2:n<=30?3:4; hh+='<i data-l="'+l+'" title="'+dkey(d)+': '+n+' reviews"></i>'; }
  h+='<div class="panel"><h3>Activity</h3><p class="sub">Every day you studied, last 12 weeks.</p><div class="heat">'+hh+'</div></div>';
  // forecast
  var buckets=new Array(14).fill(0); all.forEach(function(c){ var s=stOf(c.id); if(!s) return; var diff=Math.floor((s.due-now)/DAY); if(s.due<=now) diff=0; if(diff>=0&&diff<14) buckets[diff]++; });
  var ft=buckets.reduce(function(a,b){return a+b;},0), fh='';
  if(ft===0) fh='<p style="color:var(--faint);font-size:.9rem;margin:auto;text-align:center">Nothing scheduled yet — finish a lesson and review its cards.</p>';
  else { var mx=Math.max.apply(null,buckets.concat([1])); buckets.forEach(function(n,i){ var d=new Date(); d.setDate(d.getDate()+i); var lbl=i===0?"today":(i===1?"tmrw":(d.getMonth()+1)+"/"+d.getDate()); fh+='<div class="fbar"><span class="ct">'+(n||"")+'</span><div class="col'+(i===0?" today":"")+'" style="height:'+(n/mx*66+2)+'px"></div><span class="lb">'+(i%2===0||i===1?lbl:"")+'</span></div>'; }); }
  h+='<div class="panel"><h3>Review forecast</h3><p class="sub">What the scheduler has lined up for the next two weeks.</p><div class="forecast">'+fh+'</div></div>';
  // mastery by module
  h+='<div class="panel"><h3>Mastery by module</h3><p class="sub">Solid = mastered (21-day interval+). Faded = seen, still maturing.</p>';
  MODULES.forEach(function(m){ var cs=cardsOf(m.id), t=cs.length||1, ma=0, se=0; cs.forEach(function(c){ var s=stOf(c.id); if(!s) return; if(s.interval>=21) ma++; else se++; }); h+='<div class="mm hued" '+hueStyle(m.id)+'><span class="nm">'+esc(m.name)+'</span><span class="bar"><i style="width:'+(ma/t*100)+'%"></i><i class="seen" style="width:'+(se/t*100)+'%"></i></span><span class="pc">'+Math.round(ma/t*100)+'%</span></div>'; });
  h+='</div>';
  h+='<div class="panel"><h3>Settings</h3><p class="sub">New cards per day, and whether the course gate stays on.</p><div class="segbtns" id="npd"></div><label class="toggle" style="margin-top:16px"><input type="checkbox" id="unlockAll" '+(store.meta.unlockAll?"checked":"")+'> Unlock all lessons and cards now (turns off the guided order)</label><div class="dangerlink" style="margin-top:16px"><button id="resetAll">Reset all progress</button></div></div>';
  v.innerHTML=h;
  var np=document.getElementById("npd"); [5,10,15,20,30].forEach(function(n){ var b=document.createElement("button"); b.className="seg"; b.textContent=n; b.setAttribute("aria-pressed",store.meta.newPerDay===n?"true":"false"); b.onclick=function(){ store.meta.newPerDay=n; persist(); renderProgress(v); renderBadge(); }; np.appendChild(b); });
  document.getElementById("unlockAll").onchange=function(e){ store.meta.unlockAll=e.target.checked?1:0; persist(); renderBadge(); renderOutline(); };
  document.getElementById("resetAll").onclick=function(){ if(!window.confirm("Reset all progress, lessons, streak, and added cards? This cannot be undone.")) return; store={byId:{},userCards:[],meta:JSON.parse(JSON.stringify(DEFMETA)),updatedAt:Date.now()}; persist(); openMod=null; go("home"); };
}
function sbox(k,v,sub){ return '<div class="stat"><div class="k">'+k+'</div><div class="v">'+v+' '+(sub||"")+'</div></div>'; }

// ================= REFERENCE =================
function renderReference(v){
  var r=route.ref||"plates";
  if(r!=="plates"&&r!=="cards"&&DIAGRAMS[r]){
    var d=DIAGRAMS[r], m=mod(d.m), cds=allCards().filter(function(c){return c.dia===r;});
    crumb('<b>Reference</b> · '+esc(d.title));
    v.innerHTML='<button class="backlink" id="rBack">← All plates</button><div class="hued" '+hueStyle(m.id)+'><div class="eyebrow" style="color:var(--mh)">'+esc(m.name)+'</div><h1 style="font-size:1.5rem;margin:4px 0 12px">'+esc(d.title)+'</h1>'+figHTML(r)+figExtras(r)+'<div class="partlist">'+d.parts.map(function(p){return '<div class="partitem"><b>'+esc(p.label)+'</b><span>'+esc(p.desc)+'</span></div>';}).join("")+'</div><div class="lnav"><span class="mono" style="font-size:.74rem;color:var(--faint)">'+cds.length+' label cards</span><button class="btn primary" id="rDrill">Drill this plate</button></div></div>';
    document.getElementById("rBack").onclick=function(){ go("reference","plates"); };
    document.getElementById("rDrill").onclick=function(){ startCram(null,cds,d.title); };
    return;
  }
  crumb('<b>Reference</b>');
  var h='<div style="display:flex;gap:8px;margin-bottom:18px"><button class="seg" aria-pressed="'+(r==="plates")+'" data-r="plates">Plates</button><button class="seg" aria-pressed="'+(r==="cards")+'" data-r="cards">All cards</button></div>';
  if(r==="plates"){
    h+='<p style="color:var(--muted);max-width:66ch;margin:0 0 16px">Every textbook plate in the course, for looking things up. Drilling from here is fine any time — but the lessons are where new cards come from.</p><div class="visgrid">';
    Object.keys(DIAGRAMS).forEach(function(k){ var d=DIAGRAMS[k], m=mod(d.m); h+='<button class="viscard hued" data-d="'+k+'" '+hueStyle(m.id)+'><h3>'+esc(d.title)+'</h3><div class="ch">'+esc(m.name)+' · '+d.parts.length+' labels</div><div class="thumb">'+(FIGS[k]?'<img src="'+FIGS[k].src+'" alt="">':diaSVG(k,null,false))+'</div></button>'; });
    h+='</div>';
  } else {
    var now=Date.now();
    MODULES.forEach(function(m){ var cs=cardsOf(m.id); h+='<div class="hued" '+hueStyle(m.id)+' style="margin-bottom:22px"><div class="eyebrow" style="color:var(--mh);margin-bottom:8px">'+esc(m.name)+' · '+cs.length+'</div><div class="browse">'; cs.forEach(function(c){ var s=stOf(c.id); var lbl=!s?(unlockedCard(c.id)?"new":"locked"):(s.interval>=21?"mastered":(s.due<=now?"due":Math.round(s.interval)+"d")); h+='<div class="brow"><div class="qq">'+(c.dia?"◈ ":"")+esc(c.q)+'</div><div class="aa">'+esc(c.a)+'</div><span class="st">'+lbl+'</span></div>'; }); h+='</div></div>'; });
  }
  v.innerHTML=h;
  Array.prototype.forEach.call(v.querySelectorAll("[data-r]"),function(b){ b.onclick=function(){ go("reference",b.getAttribute("data-r")); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-d]"),function(b){ b.onclick=function(){ go("reference",b.getAttribute("data-d")); }; });
}

// ================= 3D ATLAS integration =================
var HEART_SET=["Heart (wall)","Right atrium","Left atrium","Ventricles (wall)","Tricuspid valve","Mitral valve","Pulmonary valve","Aortic valve","Papillary muscles","Right coronary artery","Left coronary artery (LAD + circumflex)","Cardiac veins","Ascending aorta","Aortic arch","Pulmonary trunk & arteries","Superior vena cava","Inferior vena cava","Pulmonary veins (R)","Pulmonary veins (L)"];
var BRAIN_SET=["Frontal lobe (R)","Frontal lobe (L)","Precentral gyrus (R)","Precentral gyrus (L)","Postcentral gyrus (R)","Postcentral gyrus (L)","Parietal lobe (R)","Parietal lobe (L)","Temporal lobe (R)","Temporal lobe (L)","Occipital lobe (R)","Occipital lobe (L)","Insula (R)","Insula (L)","Cingulate gyrus (R)","Cingulate gyrus (L)","Cerebral white matter (R)","Cerebral white matter (L)","Corpus callosum","Basal ganglia (R)","Basal ganglia (L)","Thalamus (R)","Thalamus (L)","Hypothalamus","Hippocampus (R)","Hippocampus (L)","Amygdala (R)","Amygdala (L)","Midbrain","Pons","Medulla oblongata","Cerebellum","Ventricles","Pituitary gland","Pineal gland","Optic nerve & chiasm","Spinal cord"];
var LESSON3D={
  "2-1":{dataset:"cell",only:["Plasma membrane","Cytoplasm (cytosol)","Cytoskeleton (filaments)","Mitochondria","Ribosomes (free)"],view:"front",explode:0,select:"Plasma membrane",
         hint:"The plasma membrane is the translucent outer skin of this cross-section. It is a fluid bilayer — the model shows its shape, not the proteins: picture channels, carriers and pumps studding this whole surface. Turn the other layers on with the chips when you're done.",
         tour:["Plasma membrane","Cytoskeleton (filaments)","Mitochondria"]},
  "2-2":{dataset:"cell",view:"front",explode:0,
         hint:"A real cross-section model of an animal cell (dav169, CC BY). Nucleus cut open to show chromatin and nucleolus, rough ER stacked around it with ribosomes, smooth ER off the edge, Golgi facing the membrane, centrioles with microtubules. Explode to pull it apart, then find each organelle.",
         tour:["Nuclear envelope","Nuclear pores","Nucleolus","Chromatin (DNA)","Rough endoplasmic reticulum","Ribosomes (bound)","Smooth endoplasmic reticulum","Golgi apparatus","Mitochondria","Lysosomes","Peroxisomes","Centrioles","Microtubules","Plasma membrane"]},
  "1-1":{systems:["skin","skeletal","heart","arterial","venous","respiratory","digestive","urinary","nervous","lymphatic","endocrine"],view:"front",explode:0,
         hint:"This is the whole organism, built from real MRI-derived surfaces. Everything you click is an organ — level 5 of the six levels. Turn systems off with the chips to see how the organ systems nest inside each other.",
         tour:["Heart (wall)","Liver","Stomach","Lower lobe of right lung","Kidney (L)","Urinary bladder","Cerebellum","Spleen"]},
  "3-1":{systems:["skin","skeletal"],view:"front",explode:0,hint:"The skin is drawn solid here because it's the subject. Toggle Skeleton off to see it alone, then back on to see how thin the envelope really is over the shins, clavicles and skull — the pressure-injury sites.",tour:["Skin","Clavicle (R)","Sacrum","Calcaneal (Achilles) tendon (R)"],parts:["Calcaneal (Achilles) tendon (R)"]},
  "3-2":{systems:["skeletal"],view:"front",explode:0,select:"Femur (R)",hint:"Zoom into the femur: the shaft is compact bone; the head, neck and condyles are spongy bone under a thin cortex. Neck fractures in osteoporosis happen where the trabeculae thin out.",tour:["Femur (R)","Humerus (R)","Tibia (R)","Hip bone (R)"]},
  "3-3":{lab:"shoulder",systems:["skeletal"],view:"front",explode:0,hint:"The practical below is the real deal: every bone is a separate, clickable object. Use Explode to pull the skeleton apart and see each bone's shape on its own.",
         tour:["Frontal bone","Mandible","Atlas (C1)","Axis (C2)","Manubrium","Body of sternum","Clavicle (R)","Scapula (R)","Humerus (R)","Radius (R)","Ulna (R)","Carpal bones (R)","Hip bone (R)","Sacrum","Femur (R)","Patella (R)","Tibia (R)","Fibula (R)","Tarsal bones (R)"]},
  "4-1":{systems:["muscular","skeletal"],view:"front",explode:0,hint:"Every muscle here is a real surface. Click one and read where it attaches — origin and insertion are the two ends you can see wrapping onto bone.",
         tour:["Deltoid (R)","Pectoralis major (R)","Biceps brachii (R)","Rectus abdominis (R)","External oblique (R)","Sartorius (R)","Rectus femoris (R)","Vastus lateralis (R)","Tibialis anterior (R)"]},
  "4-2":{lab:"knee",systems:["muscular","skeletal"],view:"back",explode:0,hint:"Back view. Find the antagonist pairs: triceps vs biceps, hamstrings vs quads, gastrocnemius vs tibialis anterior. The IM injection sites are here too — deltoid, ventrogluteal (gluteus medius), vastus lateralis.",
         tour:["Trapezius (R)","Latissimus dorsi (R)","Triceps brachii (R)","Erector spinae (R)","Gluteus maximus (R)","Gluteus medius (R)","Biceps femoris (R)","Semitendinosus (R)","Gastrocnemius (R)","Soleus (R)","Diaphragm","Sternocleidomastoid (R)"]},
  "5-1":{only:BRAIN_SET.concat(["Skin"]),view:"left",explode:0,hint:"The central nervous system: brain plus spinal cord, shown with the skin ghosted for scale. The spinal cord ends at L1–L2 — lumbar punctures go in below that. Toggle Skin off to see the CNS alone.",
         tour:["Cerebellum","Spinal cord","Medulla oblongata","Frontal lobe (L)"]},
  "5-4":{only:BRAIN_SET,view:"left",explode:0,hint:"Left side of the brain. Explode to separate the lobes, the deep structures and the brainstem. Slice → Brain · midline gives you the sagittal view every neuro chapter is drawn from. The three brainstem pieces — midbrain, pons, medulla — are what keep a patient breathing.",
         tour:["Frontal lobe (L)","Precentral gyrus (L)","Postcentral gyrus (L)","Parietal lobe (L)","Temporal lobe (L)","Occipital lobe (L)","Cerebellum","Corpus callosum","Thalamus (L)","Hypothalamus","Midbrain","Pons","Medulla oblongata","Spinal cord","Basal ganglia (L)","Hippocampus (L)"]},
  "6-1":{only:["Hypothalamus","Pituitary gland","Pineal gland","Thalamus (R)","Thalamus (L)","Midbrain","Pons","Medulla oblongata","Optic nerve & chiasm","Sphenoid bone","Cerebral white matter (L)"],view:"left",explode:0,select:"Pituitary gland",
         hint:"The hypothalamus sits directly above the pituitary, which hangs into the sella turcica of the sphenoid bone — the optic chiasm runs right in front of it (why pituitary tumours cause visual field loss).",
         tour:["Hypothalamus","Pituitary gland","Pineal gland","Sphenoid bone","Optic nerve & chiasm"]},
  "6-2":{only:["Adrenal gland (R)","Adrenal gland (L)","Kidney (R)","Kidney (L)","Pancreas","Thymus","Spleen","Duodenum","Abdominal aorta","Inferior vena cava","Thyroid cartilage","Trachea"],view:"front",explode:0,
         hint:"The adrenals sit like caps on the kidneys; the pancreas lies across the back of the abdomen with its head in the C of the duodenum. The thyroid gland itself is not in this dataset — it sits just below the thyroid cartilage, wrapping the trachea.",
         tour:["Adrenal gland (R)","Kidney (R)","Pancreas","Duodenum","Thymus","Thyroid cartilage"]},
  "7-2":{only:HEART_SET,view:"front",explode:0,hint:"Explode the heart to lift the chamber walls and valves out of the muscle. Then hit Slice → Heart: an axial cut through the four chambers is exactly what you'll see on a chest CT. Trace the flow: SVC/IVC → right atrium → tricuspid → right ventricle → pulmonary valve → pulmonary trunk → lungs → pulmonary veins → left atrium → mitral → left ventricle → aortic valve → aorta.",
         tour:["Superior vena cava","Right atrium","Tricuspid valve","Pulmonary valve","Pulmonary trunk & arteries","Pulmonary veins (L)","Left atrium","Mitral valve","Aortic valve","Ascending aorta","Right coronary artery","Left coronary artery (LAD + circumflex)","Cardiac veins"]},
  "7-3":{systems:["heart","arterial","venous","skeletal"],view:"front",explode:0,hint:"Arteries red, veins blue, skeleton for landmarks. Find the pulse points and the venipuncture veins — every one of these is a bedside skill.",
         tour:["Aortic arch","Common carotid artery (R)","Brachial artery (R)","Radial artery (R)","Femoral artery (R)","Popliteal artery (R)","Dorsalis pedis artery (R)","Internal jugular vein (R)","Median cubital vein (R)","Great saphenous vein (R)","Hepatic portal vein","Inferior vena cava"]},
  "7-4":{only:["Spleen","Thymus","Stomach","Kidney (L)","Ribs (L)","Diaphragm","Heart (wall)"],view:"front",explode:0,select:"Spleen",hint:"The spleen tucks under the left ribs 9–11 behind the stomach — which is why it ruptures in left-sided blunt trauma and why a big spleen is felt in the left upper quadrant.",tour:["Spleen","Thymus","Ribs (L)"]},
  "8-1":{only:["Thyroid cartilage","Cricoid cartilage","Arytenoid cartilages","Epiglottis","Hyoid bone","Trachea","Main bronchus (R)","Main bronchus (L)","Bronchial tree (R)","Bronchial tree (L)","Lingular bronchi","Upper lobe of right lung","Middle lobe of right lung","Lower lobe of right lung","Upper lobe of left lung","Lower lobe of left lung","Diaphragm","Heart (wall)","Pulmonary trunk & arteries"],view:"front",explode:0,
         hint:"Explode to pull the lobes off the bronchial tree. Slice → Lungs (T5) is a chest CT at the carina. Notice the right main bronchus is wider and more vertical — aspirated food and misplaced ET tubes go right. Turn the lobes off to see the whole airway.",
         tour:["Epiglottis","Thyroid cartilage","Cricoid cartilage","Trachea","Main bronchus (R)","Main bronchus (L)","Upper lobe of right lung","Middle lobe of right lung","Lower lobe of left lung","Bronchial tree (R)","Diaphragm"]},
  "8-2":{only:["Kidney (R)","Kidney (L)","Ureter (R)","Ureter (L)","Urinary bladder","Urethra","Prostate","Adrenal gland (R)","Adrenal gland (L)","Renal artery (R)","Renal artery (L)","Renal vein (R)","Renal vein (L)","Abdominal aorta","Inferior vena cava","L1","L2","L3","T12","Ribs (R)","Ribs (L)"],view:"front",explode:0,
         hint:"Kidneys at T12–L3, the left one slightly higher. Slice → Kidneys · coronal shows both in one plane; the axial cut at L1 shows why the right one sits lower (the liver). Renal arteries come straight off the aorta — a fifth of your cardiac output. The ureters run down to enter the bladder from behind.",
         tour:["Kidney (R)","Renal artery (R)","Renal vein (R)","Adrenal gland (R)","Ureter (R)","Urinary bladder","Urethra","Abdominal aorta"]},
  "xs":{systems:["skin","skeletal","muscular","nervous","endocrine","heart","arterial","venous","lymphatic","respiratory","digestive","urinary","reproductive"],view:"front",explode:0,slice:"heart",
         hint:"Cross-sections. The plane cuts the real model; the right-hand panel shows the slice in radiological orientation — patient's right on your left, anterior at the top — like a CT. Scroll on the slice to move the plane, click anything in it to name it, switch to CT for the grey-scale you'll see on the ward."},
  "8-4":{only:["Tongue","Salivary glands","Esophagus","Stomach","Liver","Gallbladder","Bile ducts","Pancreas","Duodenum","Jejunum","Ileum","Appendix","Colon","Rectum","Spleen","Hepatic portal vein","Diaphragm"],view:"front",explode:0,
         hint:"Toggle the liver off to see the stomach and duodenum behind it, then explode to separate the tract into its segments. Follow the hepatic portal vein: everything absorbed goes to the liver first.",
         tour:["Esophagus","Stomach","Liver","Gallbladder","Pancreas","Duodenum","Jejunum","Ileum","Appendix","Colon","Rectum","Hepatic portal vein"]}
};
var viewer3d=null;
function kill3d(){ if(viewer3d){ try{ viewer3d.dispose(); }catch(e){} viewer3d=null; } }
function has3d(L){ return !!(LESSON3D[L.id] && window.Atlas3D && window.AP3D_B64); }
function partCard(p){
  // find a course card that talks about this structure
  var base=p.n.replace(/\s\((R|L)\)$/,"").toLowerCase().replace(/\s*\(.*\)$/,"");
  var key=base.split(" ")[0]; if(key.length<4) key=base;
  var best=null, bestScore=0;
  allCards().forEach(function(c){ var t=(c.q+" "+c.a).toLowerCase(); var s=0; if(t.indexOf(base)>=0) s=3; else if(t.indexOf(key)>=0) s=1; if(s>bestScore){ bestScore=s; best=c; } });
  return bestScore>=1 ? best : null;
}
function partLessonId(p){ var c=partCard(p); return c ? CARD_LESSON[c.id] : null; }
function infoExtra3d(p){
  var c=partCard(p); if(!c) return "";
  var lid=CARD_LESSON[c.id], L=lid&&lessonById(lid);
  return '<button class="a3d-link" data-lesson="'+esc(lid||"")+'"><b>In the course</b>'+esc(c.q)+(L?'<span style="display:block;color:var(--muted);margin-top:3px;font-size:.74rem">Lesson '+esc(lid)+' · '+esc(L.title.split(" — ")[0])+'</span>':'')+'</button>';
}
function bind3dLinks(host){ Array.prototype.forEach.call(host.querySelectorAll(".a3d-link[data-lesson]"),function(b){ b.onclick=function(){ var id=b.getAttribute("data-lesson"); if(id&&(isUnlocked(id)||lessonDone(id))){ kill3d(); setCur(id,0); go("lesson",id); } else if(id){ b.querySelector("b").textContent="Locked until you reach lesson "+id; } }; }); }
function mount3d(host, preset, tour, onDone, dataset){
  kill3d();
  viewer3d=Atlas3D.create(host,{dataset:dataset||"body", preset:preset, tour:tour||null, infoExtra:infoExtra3d, onTourDone:onDone,
    onSelect:function(){ bind3dLinks(host); }});
}
function render3dStep(L){
  var pr=LESSON3D[L.id];
  return '<p style="color:var(--muted);max-width:66ch;margin:0 0 12px">'+esc(pr.hint)+'</p><div id="a3dHost"></div>'+
    (pr.lab?'<div class="labcta"><div><b>Joint lab</b><span>Move a real '+esc(pr.lab)+' — bones, ligaments under live tension, and the exam maneuvers you\'ll be tested on.</span></div><button class="btn primary" id="openLab">Open the joint lab →</button></div>':'')+
    '<div class="a3d-foot"><span class="mono" style="font-size:.72rem;color:var(--faint)">'+(pr.dataset==="cell"?'Cell model: "Eukaryotic Cell Cross Section" by dav169 (Sketchfab), CC BY 4.0 · simplified for the browser':'Model: BodyParts3D © Database Center for Life Science, CC BY 4.0 · '+window.AP3D_MAN.parts.length+' structures')+'</span></div>'+
    '<div class="lnav"><button class="btn ghost" id="lPrev">← Back</button><button class="btn primary big" id="lNext">'+(pr.tour?'Check yourself →':'Check yourself →')+'</button></div>';
}
function after3dRender(L){
  var pr=LESSON3D[L.id], host=document.getElementById("a3dHost"); if(!host) return;
  var preset={systems:pr.systems, only:pr.only, parts:pr.parts, view:pr.view, explode:pr.explode||0, select:pr.select};
  mount3d(host, preset, pr.tour, function(t){ if(!store.meta.tours) store.meta.tours={}; store.meta.tours[L.id]={misses:t.misses,at:Date.now()}; persist(); }, pr.dataset);
  var lb=document.getElementById("openLab"); if(lb) lb.onclick=function(){ go("joints", pr.lab); };
}
// ---- joint lab view ----
function renderJoints(v){
  crumb('<b>Joint Lab</b>');
  v.innerHTML='<div style="margin-bottom:14px"><div class="eyebrow">Joint lab</div><h1 style="font-size:1.7rem;margin-top:4px">How joints move — and how you test them</h1><p style="color:var(--muted);max-width:70ch;margin:8px 0 0">Real bones from the same dataset, hinged at the joint. Drag the sliders to move it; the ligaments and tendons are drawn between their attachment sites and change colour as they slacken or tighten. Every exam maneuver from the physical-assessment lists puts the joint in its test position and shows you which structure it loads.</p></div><div id="a3dHost"></div><div class="a3d-foot"><span class="mono" style="font-size:.72rem;color:var(--faint)">Bones: BodyParts3D © DBCLS, CC BY 4.0. Ligament paths are schematic (drawn between landmark points on the real bones); tension is geometric, not a biomechanical model. For learning, not for diagnosing anyone.</span></div>';
  kill3d(); viewer3d=Atlas3D.createJoint(document.getElementById("a3dHost"),{joint:route.ref||"shoulder"});
}
// ---- standalone atlas view ----
function renderAtlas(v){
  crumb('<b>3D Atlas</b> · '+(window.AP3D_MAN?window.AP3D_MAN.parts.length:0)+' structures');
  var h='<div style="margin-bottom:14px"><div class="eyebrow">Explore</div><h1 style="font-size:1.7rem;margin-top:4px">The body in 3D</h1><p style="color:var(--muted);max-width:70ch;margin:8px 0 0">Real anatomical surfaces from BodyParts3D, curated down to the structures a nursing student needs to know. Click anything to name it; use the chips to layer systems; drag the Explode slider to pull the body apart. Presets below jump to the views the lessons use.</p></div>';
  h+='<div class="a3d-presets">'+[["Whole body","1-1"],["Cross-sections","xs"],["Cell","2-2"],["Skeleton","3-3"],["Muscles (front)","4-1"],["Muscles (back)","4-2"],["Brain","5-4"],["Heart","7-2"],["Vessels","7-3"],["Lungs & airway","8-1"],["Kidneys","8-2"],["Digestive","8-4"]].map(function(x){ return '<button class="seg" data-p3="'+x[1]+'">'+x[0]+'</button>'; }).join("")+'</div>';
  h+='<div class="labcta" style="margin-bottom:14px"><div><b>Cross-sections</b><span>Cut the body on any plane — axial, coronal, sagittal — and read the slice the way a CT is read. Presets for the heart, lungs, abdomen, pelvis, brain, kidneys and knee.</span></div><button class="btn" id="openXs">Open a cross-section →</button></div>';
  h+='<div class="labcta" style="margin-bottom:14px"><div><b>Joint lab</b><span>Shoulder, knee and ankle hinged on real bones — motion sliders, ligament tension, exam maneuvers.</span></div><button class="btn primary" id="openLab">Open the joint lab →</button></div>';
  h+='<p id="a3dHint" style="color:var(--muted);max-width:70ch;margin:0 0 12px;font-size:.92rem"></p><div id="a3dHost"></div><div class="a3d-foot"><span class="mono" style="font-size:.72rem;color:var(--faint)">Body: BodyParts3D © The Database Center for Life Science, CC BY 4.0 (adult male reference anatomy). Cell: "Eukaryotic Cell Cross Section" by dav169 on Sketchfab, CC BY 4.0. Both simplified for the browser. Educational, not clinical.</span></div>';
  v.innerHTML=h;
  var host=document.getElementById("a3dHost");
  function load(id){ var pr=LESSON3D[id]; Array.prototype.forEach.call(v.querySelectorAll("[data-p3]"),function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-p3")===id ? "true":"false"); });
    var hint=document.getElementById("a3dHint"); if(hint) hint.textContent=pr.hint||"";
    mount3d(host,{systems:pr.systems, only:pr.only, parts:pr.parts, view:pr.view, explode:0, select:pr.select, slice:pr.slice}, null, null, pr.dataset); }
  Array.prototype.forEach.call(v.querySelectorAll("[data-p3]"),function(b){ b.onclick=function(){ load(b.getAttribute("data-p3")); }; });
  document.getElementById("openLab").onclick=function(){ go("joints"); };
  document.getElementById("openXs").onclick=function(){ load("xs"); window.scrollTo({top:document.getElementById("a3dHost").offsetTop-80, behavior:"smooth"}); };
  load(route.ref&&LESSON3D[route.ref]?route.ref:"1-1");
}

// ================= keyboard, chrome, boot =================
document.addEventListener("keydown",function(e){
  if(!session) return;
  if(e.target&&e.target.tagName==="TEXTAREA"&&!session.flipped){ if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){ e.preventDefault(); flip(); } return; }
  if(!session.flipped){ if(e.code==="Space"){ e.preventDefault(); flip(); } return; }
  if(session.mode==="cram"){ if(e.key==="1") grade("again"); else if(e.key==="3"||e.key==="2") grade("good"); return; }
  if(e.key==="1")grade("again"); else if(e.key==="2")grade("hard"); else if(e.key==="3")grade("good"); else if(e.key==="4")grade("easy");
});
Array.prototype.forEach.call(document.querySelectorAll(".navbtn"),function(b){ b.onclick=function(){ quiz=null; go(b.getAttribute("data-view")); }; });
document.getElementById("menubtn").onclick=function(){ document.getElementById("side").classList.toggle("open"); document.getElementById("scrim").classList.toggle("on"); };
document.getElementById("scrim").onclick=function(){ document.getElementById("side").classList.remove("open"); document.getElementById("scrim").classList.remove("on"); };
var root=document.documentElement; document.getElementById("themebtn").onclick=function(){ var cur=root.getAttribute("data-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"); root.setAttribute("data-theme",cur==="dark"?"light":"dark"); };

CARDS=CARDS.concat(buildDiagramCards());
indexLessons();
loadLocal();
go("home");
initDb();
})();
