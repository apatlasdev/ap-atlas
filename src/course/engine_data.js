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

