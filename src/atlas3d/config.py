# Curated structure list for A&P Atlas 3D.
# Each entry: (display name, system, source, [match names], max_tris)
# source: 'stl' = BodyParts3D part-of STL set (whole organs / whole muscles)
#         'leaf' = BodyParts3D is-a leaf set (human-atlas optimized bins)
# '{s}' in a match name expands to right/left and yields two entries "(R)"/"(L)".
# Names are matched case-insensitively and exactly.

S = lambda name, system, src, matches, cap, **kw: dict(name=name, system=system, src=src, matches=matches, cap=cap, **kw)

CFG = []

# ---------------- INTEGUMENTARY ----------------
CFG += [S("Skin", "skin", "leaf", ["skin"], 16000, desc="The body's largest organ. Epidermis, dermis, hypodermis; barrier, thermoregulation, vitamin D, sensation.")]

# ---------------- SKELETAL (leaf set: every bone) ----------------
SK = "skeletal"
SKULL = [("Frontal bone", ["frontal bone"], "Forms the forehead and roof of the orbits."),
         ("Parietal bone ({S})", ["{s} parietal bone"], "Paired bones forming the sides and roof of the cranium."),
         ("Temporal bone ({S})", ["{s} temporal bone"], "Houses the ear; mastoid and styloid processes."),
         ("Occipital bone", ["occipital bone"], "Back of the skull; foramen magnum for the spinal cord."),
         ("Sphenoid bone", ["sphenoid bone"], "Keystone of the cranial floor; sella turcica holds the pituitary."),
         ("Ethmoid bone", ["ethmoid"], "Between the orbits; cribriform plate carries olfactory nerves."),
         ("Zygomatic bone ({S})", ["{s} zygomatic bone"], "Cheekbone."),
         ("Maxilla ({S})", ["{s} maxilla"], "Upper jaw; holds the upper teeth."),
         ("Mandible", ["mandible"], "Lower jaw; the only freely movable skull bone (TMJ)."),
         ("Nasal bone ({S})", ["{s} nasal bone"], "Bridge of the nose."),
         ("Palatine bone ({S})", ["{s} palatine bone"], "Posterior hard palate."),
         ("Vomer", ["vomer"], "Lower part of the nasal septum."),
         ("Hyoid bone", ["hyoid bone"], "Floats in the neck; anchors tongue and larynx. Articulates with no other bone."),
         ("Teeth (upper)", ["{s} upper central secondary incisor tooth", "{s} upper lateral secondary incisor tooth", "{s} upper secondary canine tooth", "{s} upper first secondary premolar tooth", "{s} upper second secondary premolar tooth", "{s} upper first secondary molar tooth", "{s} upper second secondary molar tooth"], None),
         ("Teeth (lower)", ["{s} lower central secondary incisor tooth", "{s} lower lateral secondary incisor tooth", "{s} lower secondary canine tooth", "{s} lower first secondary premolar tooth", "{s} lower second secondary premolar tooth", "{s} lower first secondary molar tooth", "{s} lower second secondary molar tooth"], None)]
for n, m, d in SKULL:
    CFG.append(S(n, SK, "leaf", m, 2200, desc=d, both=True))

VERT = [("Atlas (C1)", ["atlas"], "First cervical vertebra; supports the skull, allows nodding."),
        ("Axis (C2)", ["axis"], "Second cervical vertebra; the dens allows head rotation."),
        ("C3", ["third cervical vertebra"], None), ("C4", ["fourth cervical vertebra"], None), ("C5", ["fifth cervical vertebra"], None), ("C6", ["sixth cervical vertebra"], None), ("C7", ["seventh cervical vertebra"], "Vertebra prominens — the bump you feel at the base of the neck."),
        ("T1", ["first thoracic vertebra"], None), ("T2", ["second thoracic vertebra"], None), ("T3", ["third thoracic vertebra"], None), ("T4", ["fourth thoracic vertebra"], None), ("T5", ["fifth thoracic vertebra"], None), ("T6", ["sixth thoracic vertebra"], None), ("T7", ["seventh thoracic vertebra"], None), ("T8", ["eighth thoracic vertebra"], None), ("T9", ["ninth thoracic vertebra"], None), ("T10", ["tenth thoracic vertebra"], None), ("T11", ["eleventh thoracic vertebra"], None), ("T12", ["twelfth thoracic vertebra"], None),
        ("L1", ["first lumbar vertebra"], None), ("L2", ["second lumbar vertebra"], None), ("L3", ["third lumbar vertebra"], None), ("L4", ["fourth lumbar vertebra"], "L4 spinous process is the iliac-crest landmark for lumbar puncture."), ("L5", ["fifth lumbar vertebra"], None),
        ("Sacrum", ["sacrum"], "Five fused vertebrae; forms the back of the pelvis.")]
for n, m, d in VERT:
    CFG.append(S(n, SK, "leaf", m, 1400, desc=d))
CFG.append(S("Intervertebral discs", SK, "leaf", ["intervertebral disk", "intervertebral disk of axis"] + ["intervertebral disk of %s" % v for v in ["third cervical vertebra","fourth cervical vertebra","fifth cervical vertebra","sixth cervical vertebra","seventh cervical vertebra","first thoracic vertebra","second thoracic vertebra","third thoracic vertebra","fourth thoracic vertebra","fifth thoracic vertebra","sixth thoracic vertebra","seventh thoracic vertebra","eighth thoracic vertebra","ninth thoracic vertebra","tenth thoracic vertebra","eleventh thoracic vertebra","twelfth thoracic vertebra","first lumbar vertebra","second lumbar vertebra","third lumbar vertebra","fourth lumbar vertebra","fifth lumbar vertebra"]], 6000, desc="Fibrocartilage cushions between vertebral bodies: annulus fibrosus around a nucleus pulposus."))

THORAX = [("Manubrium", ["manubrium"], "Top of the sternum; sternal angle marks rib 2."),
          ("Body of sternum", ["body of sternum"], "CPR compressions go on the lower half."),
          ("Xiphoid process", ["xiphoid process"], "Cartilage tip of the sternum; avoid during compressions."),
          ("Ribs ({S})", ["{s} first rib","{s} second rib","{s} third rib","{s} fourth rib","{s} fifth rib","{s} sixth rib","{s} seventh rib","{s} eighth rib","{s} ninth rib","{s} tenth rib","{s} eleventh rib","{s} twelfth rib"], "12 pairs: 1–7 true, 8–10 false, 11–12 floating."),
          ("Costal cartilages ({S})", ["{s} first costal cartilage","{s} second costal cartilage","{s} third costal cartilage","{s} fourth costal cartilage","{s} fifth costal cartilage","{s} sixth costal cartilage","{s} seventh costal cartilage"], "Hyaline cartilage joining ribs to the sternum.")]
for n, m, d in THORAX:
    CFG.append(S(n, SK, "leaf", m, 9000 if "Ribs" in n else 1600, desc=d, both=True))

LIMB = [("Clavicle ({S})", ["{s} clavicle"], "Collarbone; most commonly fractured bone.", 900),
        ("Scapula ({S})", ["{s} scapula"], "Shoulder blade; glenoid cavity, acromion, coracoid process.", 2200),
        ("Humerus ({S})", ["{s} humerus"], "Upper arm; surgical neck fractures risk the axillary nerve.", 1600),
        ("Radius ({S})", ["{s} radius"], "Lateral forearm bone (thumb side); distal end = Colles fracture site.", 900),
        ("Ulna ({S})", ["{s} ulna"], "Medial forearm bone; olecranon is the elbow point.", 900),
        ("Carpal bones ({S})", ["{s} scaphoid","{s} lunate","{s} triquetral","{s} pisiform","{s} trapezium","{s} trapezoid","{s} capitate","{s} hamate"], "Eight wrist bones. Scaphoid fracture → snuffbox tenderness.", 1800),
        ("Metacarpals ({S})", ["{s} first metacarpal bone","{s} second metacarpal bone","{s} third metacarpal bone","{s} fourth metacarpal bone","{s} fifth metacarpal bone"], "Palm bones I–V.", 1600),
        ("Phalanges of hand ({S})", ["proximal phalanx of {s} thumb","distal phalanx of {s} thumb"] + ["%s phalanx of {s} %s" % (p, f) for f in ["index finger","middle finger","ring finger","little finger"] for p in ["proximal","middle","distal"]], "14 finger bones per hand.", 2600),
        ("Hip bone ({S})", ["{s} hip bone"], "Ilium + ischium + pubis fused; acetabulum receives the femoral head.", 2200),
        ("Femur ({S})", ["{s} femur"], "Longest, strongest bone. Neck fractures common in osteoporosis.", 1600),
        ("Patella ({S})", ["{s} patella"], "Kneecap; sesamoid bone in the quadriceps tendon.", 500),
        ("Tibia ({S})", ["{s} tibia"], "Shin bone; weight-bearing; medial malleolus.", 1400),
        ("Fibula ({S})", ["{s} fibula"], "Lateral leg bone; lateral malleolus; not weight-bearing.", 900),
        ("Talus ({S})", ["{s} talus"], "Sits in the ankle mortise between the malleoli; no muscle attaches to it.", 900),
        ("Calcaneus ({S})", ["{s} calcaneus"], "Heel bone; the Achilles tendon inserts here.", 900),
        ("Tarsal bones ({S})", ["navicular bone of {s} foot","{s} cuboid bone","{s} medial cuneiform bone","{s} intermediate cuneiform bone","{s} lateral cuneiform bone"], "Navicular, cuboid and the three cuneiforms.", 1400),
        ("Metatarsals ({S})", ["{s} first metatarsal bone","{s} second metatarsal bone","{s} third metatarsal bone","{s} fourth metatarsal bone","{s} fifth metatarsal bone"], None, 1600),
        ("Phalanges of foot ({S})", ["proximal phalanx of {s} big toe","distal phalanx of {s} big toe"] + ["%s phalanx of {s} %s" % (p, f) for f in ["second toe","third toe","fourth toe","little toe"] for p in ["proximal","middle","distal"]], None, 2200)]
for n, m, d, cap in LIMB:
    CFG.append(S(n, SK, "leaf", m, cap, desc=d, both=True))

# Larynx cartilages (respiratory module, but bone-like)
CFG += [S("Thyroid cartilage", "respiratory", "leaf", ["thyroid cartilage"], 1200, desc="Adam's apple; shields the vocal cords."),
        S("Cricoid cartilage", "respiratory", "leaf", ["cricoid cartilage"], 900, desc="Complete ring below the thyroid cartilage; cricothyrotomy goes through the membrane above it."),
        S("Arytenoid cartilages", "respiratory", "leaf", ["right arytenoid cartilage","left arytenoid cartilage","right corniculate cartilage","left corniculate cartilage"], 900, desc="Pivot to open and close the vocal cords."),
        S("Epiglottis", "respiratory", "leaf", ["epiglottis"], 900, desc="Leaf-shaped flap that seals the airway during swallowing.")]

# ---------------- MUSCULAR (STL set: whole muscles) ----------------
MU = "muscular"
MUSC = [
 ("Temporalis ({S})", ["{s} temporalis"], "Closes the jaw; fan-shaped on the side of the skull.", 2000),
 ("Masseter ({S})", ["superficial part of {s} masseter","deep part of {s} masseter"], "Strongest jaw closer; clench and feel it.", 1400),
 ("Orbicularis oculi ({S})", ["orbital part of {s} orbicularis oculi","palpebral part of {s} orbicularis oculi"], "Closes the eye (CN VII).", 1200),
 ("Orbicularis oris", ["orbicularis oris"], "Purses the lips.", 1200),
 ("Frontalis ({S})", ["{s} frontalis"], "Raises the eyebrows (CN VII).", 900),
 ("Buccinator ({S})", ["{s} buccinator"], "Cheek muscle; keeps food between the teeth.", 700),
 ("Platysma ({S})", ["{s} platysma"], "Thin sheet over the front of the neck.", 1200),
 ("Sternocleidomastoid ({S})", ["{s} sternocleidomastoid"], "Rotates and flexes the head; accessory muscle of respiration (CN XI).", 1400),
 ("Scalenes ({S})", ["{s} scalenus anterior","{s} scalenus medius","{s} scalenus posterior"], "Lift ribs 1–2 in forced inspiration.", 1200),
 ("Trapezius ({S})", ["ascending part of {s} trapezius","transverse part of {s} trapezius","descending part of {s} trapezius"], "Elevates, retracts and depresses the scapula (CN XI).", 2600),
 ("Levator scapulae ({S})", ["{s} levator scapulae"], None, 700),
 ("Rhomboids ({S})", ["{s} rhomboid major","{s} rhomboid minor"], "Retract the scapula.", 1200),
 ("Latissimus dorsi ({S})", ["{s} latissimus dorsi"], "Extends, adducts and medially rotates the arm — the 'swimmer's muscle'.", 2600),
 ("Deltoid ({S})", ["clavicular part of {s} deltoid","acromial part of {s} deltoid","spinal part of {s} deltoid"], "Abducts the arm; IM injection site (deltoid).", 2200),
 ("Pectoralis major ({S})", ["clavicular part of {s} pectoralis major","sternocostal part of {s} pectoralis major","abdominal part of {s} pectoralis major"], "Adducts and medially rotates the arm.", 2400),
 ("Pectoralis minor ({S})", ["{s} pectoralis minor"], None, 900),
 ("Serratus anterior ({S})", ["{s} serratus anterior"], "Protracts the scapula; winged scapula if the long thoracic nerve is injured.", 2400),
 ("Supraspinatus ({S})", ["{s} supraspinatus"], "Rotator cuff: initiates abduction.", 900),
 ("Infraspinatus ({S})", ["{s} infraspinatus muscle"], "Rotator cuff: external rotation.", 1000),
 ("Teres minor ({S})", ["{s} teres minor"], "Rotator cuff: external rotation.", 600),
 ("Subscapularis ({S})", ["{s} subscapularis"], "Rotator cuff: internal rotation.", 1000),
 ("Teres major ({S})", ["{s} teres major"], None, 700),
 ("Biceps brachii ({S})", ["long head of {s} biceps brachii","short head of {s} biceps brachii"], "Flexes the elbow and supinates the forearm.", 1400),
 ("Brachialis ({S})", ["{s} brachialis"], "Prime elbow flexor.", 900),
 ("Coracobrachialis ({S})", ["{s} coracobrachialis"], None, 600),
 ("Triceps brachii ({S})", ["long head of {s} triceps brachii","lateral head of {s} triceps brachii","medial head of {s} triceps brachii"], "Extends the elbow.", 1800),
 ("Brachioradialis ({S})", ["{s} brachioradialis"], "Elbow flexor in mid-pronation.", 800),
 ("Forearm flexors ({S})", ["{s} flexor carpi radialis","{s} palmaris longus","humeral head of {s} flexor carpi ulnaris","ulnar head of {s} flexor carpi ulnaris","humeroulnar head of {s} flexor digitorum superficialis","radial head of {s} flexor digitorum superficialis","{s} flexor digitorum profundus","{s} flexor pollicis longus","humeral head of {s} pronator teres","ulnar head of {s} pronator teres","{s} pronator quadratus"], "Anterior compartment: wrist/finger flexion and pronation (median and ulnar nerves).", 4000),
 ("Forearm extensors ({S})", ["{s} extensor carpi radialis longus","{s} extensor carpi radialis brevis","{s} extensor digitorum","{s} extensor digiti minimi","humeral head of {s} extensor carpi ulnaris","ulnar head of {s} extensor carpi ulnaris","{s} extensor pollicis longus","{s} extensor pollicis brevis","{s} abductor pollicis longus","{s} extensor indicis","{s} supinator","{s} anconeus"], "Posterior compartment: wrist/finger extension (radial nerve).", 4000),
 ("Hand muscles ({S})", ["{s} abductor pollicis brevis","superficial head of {s} flexor pollicis brevis","deep head of {s} flexor pollicis brevis","{s} opponens pollicis","oblique head of {s} adductor pollicis","transverse head of {s} adductor pollicis","abductor digiti minimi of {s} hand","flexor digiti minimi brevis of {s} hand","opponens digiti minimi of {s} hand","set of lumbricals of {s} hand","set of dorsal interossei of {s} hand","set of palmar interossei of {s} hand"], "Thenar, hypothenar, lumbricals and interossei.", 2600),
 ("Rectus abdominis ({S})", ["{s} rectus abdominis"], "The 'six-pack'; flexes the trunk.", 2000),
 ("External oblique ({S})", ["{s} external oblique"], "Hands-in-pockets fiber direction; trunk rotation and compression.", 2600),
 ("Internal oblique ({S})", ["{s} internal oblique"], None, 2000),
 ("Transversus abdominis ({S})", ["{s} transversus abdominis"], "Deepest abdominal muscle; corset-like compression.", 2000),
 ("Quadratus lumborum ({S})", ["{s} quadratus lumborum"], None, 700),
 ("Psoas major ({S})", ["{s} psoas major"], "With iliacus = iliopsoas, the main hip flexor.", 1200),
 ("Iliacus ({S})", ["{s} iliacus"], None, 1000),
 ("Diaphragm", ["diaphragm"], "Primary muscle of breathing (phrenic nerve, C3–C5).", 4000),
 ("External intercostals", ["external intercostal muscle"], "Lift the ribs for inspiration.", 5000),
 ("Internal intercostals", ["internal intercostal muscle"], "Depress the ribs in forced expiration.", 4000),
 ("Erector spinae ({S})", ["{s} iliocostalis lumborum","{s} iliocostalis thoracis","{s} iliocostalis cervicis","{s} longissimus thoracis","{s} longissimus cervicis","{s} longissimus capitis","{s} spinalis thoracis","{s} spinalis cervicis"], "Iliocostalis, longissimus, spinalis: extend the spine.", 4000),
 ("Splenius ({S})", ["{s} splenius capitis","{s} splenius cervicis"], "Extend and rotate the head.", 1200),
 ("Gluteus maximus ({S})", ["{s} gluteus maximus"], "Hip extensor; climbing stairs, standing from a chair.", 1400),
 ("Gluteus medius ({S})", ["{s} gluteus medius"], "Hip abductor; stabilizes the pelvis in walking (Trendelenburg). Ventrogluteal IM site.", 1400),
 ("Gluteus minimus ({S})", ["{s} gluteus minimus"], None, 1200),
 ("Tensor fasciae latae ({S})", ["{s} tensor fasciae latae"], None, 700),
 ("Iliotibial tract ({S})", ["{s} iliotibial tract"], "Thick fascia down the lateral thigh.", 1400),
 ("Piriformis ({S})", ["{s} piriformis"], "Sciatic nerve passes beneath it.", 600),
 ("Deep hip rotators ({S})", ["{s} obturator internus","{s} obturator externus","{s} gemellus superior","{s} gemellus inferior","{s} quadratus femoris"], None, 1600),
 ("Sartorius ({S})", ["{s} sartorius"], "Longest muscle; the 'tailor's' cross-legged position.", 1200),
 ("Rectus femoris ({S})", ["{s} rectus femoris"], "Quadriceps head that also flexes the hip.", 1400),
 ("Vastus lateralis ({S})", ["{s} vastus lateralis"], "Quadriceps; IM injection site in infants.", 1800),
 ("Vastus medialis ({S})", ["{s} vastus medialis"], "Quadriceps; the teardrop above the knee.", 1400),
 ("Vastus intermedius ({S})", ["{s} vastus intermedius"], None, 1200),
 ("Adductors ({S})", ["{s} adductor longus","{s} adductor brevis","{s} adductor magnus","{s} adductor minimus","{s} pectineus","{s} gracilis"], "Medial thigh: adduct the hip (obturator nerve).", 3200),
 ("Biceps femoris ({S})", ["long head of {s} biceps femoris","short head of {s} biceps femoris"], "Lateral hamstring.", 1400),
 ("Semitendinosus ({S})", ["{s} semitendinosus"], "Medial hamstring.", 1000),
 ("Semimembranosus ({S})", ["{s} semimembranosus"], "Medial hamstring.", 1000),
 ("Gastrocnemius ({S})", ["medial head of {s} gastrocnemius","lateral head of {s} gastrocnemius"], "Calf; plantarflexion; crosses the knee.", 1800),
 ("Soleus ({S})", ["{s} soleus"], "Deep calf; the 'second heart' venous pump.", 1400),
 ("Calcaneal (Achilles) tendon ({S})", ["{s} calcaneal tendon"], "Strongest tendon; gastrocnemius + soleus to the heel.", 600),
 ("Tibialis anterior ({S})", ["{s} tibialis anterior"], "Dorsiflexes the foot; foot drop if the deep fibular nerve fails.", 1000),
 ("Tibialis posterior ({S})", ["{s} tibialis posterior"], None, 1000),
 ("Fibularis muscles ({S})", ["{s} fibularis longus","{s} fibularis brevis","{s} fibularis tertius"], "Evert the foot.", 1600),
 ("Deep leg flexors ({S})", ["{s} flexor digitorum longus","{s} flexor hallucis longus","{s} popliteus","{s} plantaris"], None, 1800),
 ("Leg extensors ({S})", ["{s} extensor digitorum longus","{s} extensor hallucis longus"], None, 1200),
 ("Foot muscles ({S})", ["{s} abductor hallucis","{s} flexor digitorum brevis","abductor digiti minimi of {s} foot","{s} flexor accessorius","medial head of {s} flexor hallucis brevis","lateral head of {s} flexor hallucis brevis","oblique head of {s} adductor hallucis","transverse head of {s} adductor hallucis","flexor digiti minimi brevis of {s} foot","{s} extensor digitorum brevis","{s} extensor hallucis brevis","set of dorsal interossei of {s} foot"], None, 2600),
 ("Pelvic floor ({S})", ["{s} pubococcygeus","{s} iliococcygeus","{s} puborectalis","{s} coccygeus"], "Levator ani + coccygeus support the pelvic organs.", 1200),
]
for n, m, d, cap in MUSC:
    CFG.append(S(n, MU, "stl", m, cap, desc=d, both=True))

# ---------------- NERVOUS ----------------
NV = "nervous"
NERV = [
 ("Frontal lobe ({S})", "leaf", ["{s} superior frontal gyrus","{s} middle frontal gyrus","{s} inferior frontal gyrus"], "Planning, judgment, personality, Broca's area (left).", 3000),
 ("Precentral gyrus ({S})", "leaf", ["{s} precentral gyrus"], "Primary motor cortex — the motor homunculus.", 1200),
 ("Postcentral gyrus ({S})", "leaf", ["{s} postcentral gyrus"], "Primary somatosensory cortex.", 1200),
 ("Parietal lobe ({S})", "leaf", ["{s} superior parietal lobule","{s} supramarginal gyrus","{s} angular gyrus"], "Spatial awareness, sensory integration.", 2200),
 ("Temporal lobe ({S})", "leaf", ["anterior part of {s} superior temporal gyrus","posterior part of {s} superior temporal gyrus","{s} middle temporal gyrus","{s} inferior temporal gyrus","{s} fusiform gyrus","{s} parahippocampal gyrus"], "Hearing, memory, Wernicke's area (left).", 2600),
 ("Occipital lobe ({S})", "leaf", ["{s} occipital lobe"], "Primary visual cortex.", 1600),
 ("Insula ({S})", "leaf", ["{s} insula"], "Interoception, taste; deep to the lateral sulcus.", 800),
 ("Cingulate gyrus ({S})", "leaf", ["{s} cingulate gyrus"], "Limbic cortex above the corpus callosum.", 900),
 ("Cerebral white matter ({S})", "leaf", ["white matter of {s} cerebral hemisphere"], "Myelinated tracts connecting cortex to everything else.", 3600),
 ("Corpus callosum", "leaf", ["corpus callosum"], "Bridges the two hemispheres.", 700),
 ("Basal ganglia ({S})", "leaf", ["{s} caudate nucleus","{s} putamen","{s} globus pallidus"], "Movement modulation; Parkinson's disease lives here.", 1400),
 ("Thalamus ({S})", "leaf", ["{s} thalamus"], "Relay station for nearly all sensory input to cortex.", 600),
 ("Hypothalamus", "leaf", ["hypothalamus"], "Homeostasis HQ: temperature, hunger, thirst, pituitary control.", 700),
 ("Hippocampus ({S})", "leaf", ["{s} hippocampus"], "Forms new memories.", 500),
 ("Amygdala ({S})", "leaf", ["{s} amygdala"], "Fear and emotional memory.", 400),
 ("Midbrain", "leaf", ["midbrain","peduncle of midbrain"], "Brainstem top: visual/auditory reflexes, substantia nigra.", 1400),
 ("Pons", "leaf", ["pons"], "Brainstem middle: breathing rhythm modulation, bridge to cerebellum.", 1200),
 ("Medulla oblongata", "leaf", ["medulla oblongata"], "Cardiac, vasomotor and respiratory centers — the vital signs brainstem.", 1000),
 ("Cerebellum", "leaf", ["cerebellum"], "Coordination, balance, posture.", 3000),
 ("Ventricles", "leaf", ["left lateral ventricle","right lateral ventricle","third ventricle","fourth ventricle","interventricular foramen","cerebral aqueduct"], "CSF-filled spaces; hydrocephalus if flow is blocked.", 2400),
 ("Pituitary gland", "leaf", ["pituitary gland"], "Master gland in the sella turcica; anterior and posterior lobes.", 500),
 ("Pineal gland", "leaf", ["pineal body"], "Melatonin; sleep–wake rhythm.", 300),
 ("Optic nerve & chiasm", "leaf", ["left optic nerve","right optic nerve","optic chiasm","left optic tract","right optic tract"], "CN II; fibers from the nasal retina cross at the chiasm.", 1200),
]
for n, src, m, d, cap in NERV:
    CFG.append(S(n, NV, src, m, cap, desc=d, both=True))
CFG.append(S("Eyeballs", NV, "stl", ["eyeball"], 1600, desc="Cornea, lens, retina; CN II carries the signal."))
CFG.append(S("Spinal cord", NV, "synth", ["medulla oblongata"], 4000, desc="Runs from the foramen magnum down the vertebral canal to about L1–L2 (conus medullaris); below that the cauda equina. Lumbar puncture goes in below it, at L3–L4."))

# ---------------- ENDOCRINE ----------------
EN = "endocrine"
CFG += [S("Adrenal gland ({S})", EN, "leaf", ["{s} adrenal gland"], 900, desc="Cortex: cortisol, aldosterone. Medulla: adrenaline.", both=True),
        S("Thymus", "lymphatic", "leaf", ["right lobe of thymus","left lobe of thymus"], 900, desc="T-cell maturation; large in children, shrinks with age."),
        S("Spleen", "lymphatic", "leaf", ["spleen"], 900, desc="Filters blood, recycles red cells, immune surveillance."),
        S("Pancreas", "digestive", "leaf", ["pancreas","parenchyma of pancreas"], 1600, desc="Exocrine enzymes into the duodenum; islets make insulin and glucagon.")]

# ---------------- CARDIOVASCULAR ----------------
CV = "heart"
CFG += [S("Heart (wall)", CV, "stl", ["wall of heart"], 9000, desc="Four-chambered pump. Right side → lungs, left side → body."),
        S("Right atrium", CV, "leaf", ["wall of right atrium"], 1200, desc="Receives venous blood from SVC, IVC and coronary sinus. SA node lives here."),
        S("Left atrium", CV, "leaf", ["wall of left atrium"], 1200, desc="Receives oxygenated blood from the four pulmonary veins."),
        S("Ventricles (wall)", CV, "leaf", ["wall of ventricle"], 2400, desc="Left ventricle wall is ~3× thicker: it pumps against systemic pressure."),
        S("Tricuspid valve", CV, "leaf", ["anterior leaflet of tricuspid valve","posterior leaflet of tricuspid valve","septal leaflet of tricuspid valve"], 1200, desc="Right AV valve, three leaflets."),
        S("Mitral valve", CV, "leaf", ["anterior leaflet of mitral valve","posterior leaflet of mitral valve"], 1000, desc="Left AV valve, two leaflets (bicuspid). Most common site of valve disease."),
        S("Pulmonary valve", CV, "leaf", ["left anterior cusp of pulmonary valve","right anterior cusp of pulmonary valve","posterior cusp of pulmonary valve"], 800, desc="Semilunar valve to the pulmonary trunk."),
        S("Aortic valve", CV, "leaf", ["anterior cusp of aortic valve","left posterior cusp of aortic valve","right posterior cusp of aortic valve"], 600, desc="Semilunar valve to the aorta; coronary arteries arise just above it."),
        S("Papillary muscles", CV, "stl", ["anterior papillary muscle of right ventricle","posterior papillary muscle of right ventricle","septal papillary muscle of right ventricle","posterior papillary muscle of left ventricle","papillary muscle of left ventricle, nsn"], 1000, desc="Anchor the chordae tendineae so AV valves don't evert."),
        S("Right coronary artery", "arterial", "stl", ["trunk of right coronary artery","marginal branch of right coronary artery","posterior interventricular branch of right coronary artery, nsn","right posterolateral branch of right coronary artery"], 1600, desc="Supplies the right heart and, usually, the SA/AV nodes — inferior MI, bradycardia."),
        S("Left coronary artery (LAD + circumflex)", "arterial", "stl", ["stem of left coronary artery","anterior interventricular branch of left coronary artery, nsn","circumflex branch of left coronary artery"], 1600, desc="LAD = 'widow-maker'; supplies the anterior LV and septum."),
        S("Cardiac veins", "venous", "stl", ["great cardiac vein","middle cardiac vein","coronary sinus","set of anterior cardiac veins","set of posterior veins of left ventricle"], 1400, desc="Drain into the coronary sinus → right atrium.")]

AR = "arterial"
ART = [
 ("Ascending aorta", ["ascending aorta"], "First part; gives off the coronary arteries.", 500),
 ("Aortic arch", ["arch of aorta"], "Branches: brachiocephalic, left common carotid, left subclavian.", 700),
 ("Descending thoracic aorta", ["descending thoracic aorta","descending aorta"], None, 1200),
 ("Abdominal aorta", ["abdominal aorta"], "Bifurcates at L4 into the common iliacs. AAA site.", 700),
 ("Pulmonary trunk & arteries", ["pulmonary trunk","right pulmonary artery","left pulmonary artery"], "Carry deoxygenated blood from the RV to the lungs.", 2400),
 ("Brachiocephalic artery", ["brachiocephalic artery"], None, 400),
 ("Common carotid artery ({S})", ["{s} common carotid artery"], "Carotid pulse; bifurcates at C4.", 700),
 ("Internal carotid artery ({S})", ["{s} internal carotid artery"], "Feeds the brain and eye.", 700),
 ("Vertebral artery ({S})", ["{s} vertebral artery"], "Runs through the transverse foramina to the basilar artery.", 700),
 ("Basilar & cerebral arteries", ["basilar artery","right anterior cerebral artery","left anterior cerebral artery","anterior communicating artery","right posterior communicating artery","left posterior communicating artery","precommunicating part of right posterior cerebral artery","precommunicating part of left posterior cerebral artery","postcommunicating part of right posterior cerebral artery","postcommunicating part of left posterior cerebral artery","sphenoid part of right middle cerebral artery","sphenoid part of left middle cerebral artery","insular part of right middle cerebral artery","insular part of left middle cerebral artery"], "Circle of Willis — collateral supply to the brain.", 3600),
 ("Subclavian artery ({S})", ["{s} subclavian artery"], None, 600),
 ("Axillary artery ({S})", ["{s} axillary artery"], None, 500),
 ("Brachial artery ({S})", ["{s} brachial artery"], "Blood-pressure cuff artery.", 800),
 ("Radial artery ({S})", ["{s} radial artery"], "Radial pulse; ABG site.", 900),
 ("Ulnar artery ({S})", ["{s} ulnar artery"], "Allen test checks it before radial puncture.", 900),
 ("Celiac trunk", ["celiac trunk","celiac artery","common hepatic artery","splenic artery","gastric artery","hepatic artery proper","trunk of hepatic artery"], "Supplies foregut: stomach, liver, spleen, pancreas.", 2200),
 ("Superior mesenteric artery", ["superior mesenteric artery"], "Midgut: small intestine to mid-transverse colon.", 800),
 ("Inferior mesenteric artery", ["inferior mesenteric artery"], "Hindgut: descending colon to rectum.", 500),
 ("Renal artery ({S})", ["{s} renal artery"], "~20% of cardiac output goes to the kidneys.", 500),
 ("Common iliac artery ({S})", ["{s} common iliac artery"], None, 400),
 ("External iliac artery ({S})", ["{s} external iliac artery"], None, 400),
 ("Internal iliac artery ({S})", ["{s} internal iliac artery"], None, 400),
 ("Femoral artery ({S})", ["{s} femoral artery"], "Femoral pulse; catheter access site.", 600),
 ("Popliteal artery ({S})", ["{s} popliteal artery"], "Behind the knee.", 500),
 ("Anterior tibial artery ({S})", ["{s} anterior tibial artery"], None, 900),
 ("Posterior tibial artery ({S})", ["{s} posterior tibial artery"], "Pulse behind the medial malleolus.", 900),
 ("Dorsalis pedis artery ({S})", ["{s} dorsalis pedis artery"], "Pedal pulse on top of the foot.", 500),
]
for n, m, d, cap in ART:
    CFG.append(S(n, AR, "leaf", m, cap, desc=d, both=True))

VE = "venous"
VEN = [
 ("Superior vena cava", ["superior vena cava"], "Drains the head, neck and arms into the right atrium. Central line tip sits here.", 500),
 ("Inferior vena cava", ["inferior vena cava"], "Drains everything below the diaphragm.", 900),
 ("Brachiocephalic vein ({S})", ["{s} brachiocephalic vein"], None, 500),
 ("Internal jugular vein ({S})", ["{s} internal jugular vein"], "JVP is read here; central line site.", 500),
 ("Subclavian vein ({S})", ["{s} subclavian vein"], None, 400),
 ("Axillary vein ({S})", ["{s} axillary vein"], None, 400),
 ("Cephalic vein ({S})", ["{s} cephalic vein"], "Lateral arm superficial vein.", 900),
 ("Basilic vein ({S})", ["{s} basilic vein"], "Medial arm; PICC line vein.", 900),
 ("Median cubital vein ({S})", ["{s} median cubital vein"], "Venipuncture favorite at the elbow.", 400),
 ("Pulmonary veins ({S})", ["{s} superior pulmonary vein","{s} inferior pulmonary vein"], "Oxygenated blood to the left atrium.", 900),
 ("Azygos system", ["azygos vein","hemiazygos vein","accessory hemiazygos vein"], "Drains the thoracic wall into the SVC.", 1200),
 ("Hepatic veins", ["right hepatic vein","middle hepatic vein","left hepatic vein","hepatic vein"], "Liver → IVC.", 1200),
 ("Hepatic portal vein", ["hepatic portal vein","portal vein","trunk of portal vein","pre-hepatic portal vein"], "Nutrient-rich gut blood to the liver first.", 1200),
 ("Splenic vein", ["splenic vein"], None, 500),
 ("Superior mesenteric vein", ["superior mesenteric vein"], None, 600),
 ("Inferior mesenteric vein", ["inferior mesenteric vein"], None, 500),
 ("Renal vein ({S})", ["{s} renal vein"], "Left is longer (crosses under the SMA).", 500),
 ("Common iliac vein ({S})", ["{s} common iliac vein"], None, 400),
 ("External iliac vein ({S})", ["{s} external iliac vein"], None, 400),
 ("Internal iliac vein ({S})", ["{s} internal iliac vein"], None, 400),
 ("Femoral vein ({S})", ["{s} femoral vein","{s} deep femoral vein"], "DVT site.", 900),
 ("Great saphenous vein ({S})", ["{s} great saphenous vein"], "Longest vein; graft source for CABG.", 1200),
 ("Small saphenous vein ({S})", ["{s} small saphenous vein"], None, 700),
 ("Popliteal vein ({S})", ["{s} popliteal vein"], None, 500),
 ("Tibial veins ({S})", ["{s} anterior tibial vein","{s} posterior tibial vein","{s} fibular vein"], None, 1400),
]
for n, m, d, cap in VEN:
    CFG.append(S(n, VE, "leaf", m, cap, desc=d, both=True))

# ---------------- RESPIRATORY ----------------
RS = "respiratory"
CFG += [S("Trachea", RS, "leaf", ["trachea"], 1200, desc="C-shaped cartilage rings; bifurcates at the carina (T4–T5)."),
        S("Main bronchus ({S})", RS, "leaf", ["{s} main bronchus","{s} main bronchus proper"], 900, desc="Right is wider and more vertical — aspirated objects go right.", both=True),
        S("Upper lobe of right lung", RS, "stl", ["upper lobe of right lung"], 3000, desc="Right lung has three lobes."),
        S("Middle lobe of right lung", RS, "stl", ["middle lobe of lung"], 2000, desc=None),
        S("Lower lobe of right lung", RS, "stl", ["lower lobe of right lung"], 3000, desc=None),
        S("Upper lobe of left lung", RS, "stl", ["upper lobe of left lung"], 3000, desc="Left lung has two lobes and the cardiac notch."),
        S("Lower lobe of left lung", RS, "stl", ["lower lobe of left lung"], 3000, desc=None)]
# bronchial trees: match any leaf part with 'bronchial tree' in name, by side
CFG += [S("Bronchial tree ({S})", RS, "leaf", ["*{s}*bronchial tree*"], 6000, desc="Bronchi branch ~23 times down to the alveoli.", both=True),
        S("Lingular bronchi", RS, "leaf", ["inferior lingular bronchial tree","superior lingular bronchial tree"], 1200, desc=None)]

# ---------------- URINARY ----------------
UR = "urinary"
CFG += [S("Kidney ({S})", UR, "leaf", ["{s} kidney"], 1400, desc="Retroperitoneal, T12–L3; left sits slightly higher. Filters ~180 L/day.", both=True),
        S("Ureter ({S})", UR, "leaf", ["{s} ureter"], 700, desc="Peristalsis carries urine to the bladder; stones lodge at the three narrowings.", both=True),
        S("Urinary bladder", UR, "leaf", ["urinary bladder"], 400, desc="Detrusor muscle; holds ~400–600 mL."),
        S("Urethra", UR, "leaf", ["urethra"], 400, desc="Longer in males (~20 cm) — catheter length matters."),
        S("Prostate", "reproductive", "stl", ["prostate"], 400, desc="Surrounds the urethra below the bladder.")]

# ---------------- DIGESTIVE ----------------
DG = "digestive"
CFG += [S("Tongue", DG, "leaf", ["tongue"], 500, desc=None),
        S("Salivary glands", DG, "leaf", ["left sublingual gland","right sublingual gland","left submandibular gland","right submandibular gland"], 700, desc=None),
        S("Esophagus", DG, "stl", ["esophagus"], 900, desc="~25 cm muscular tube; lower sphincter prevents reflux."),
        S("Stomach", DG, "stl", ["stomach"], 2400, desc="Fundus, body, antrum, pylorus. Acid + pepsin; intrinsic factor for B12."),
        S("Liver", DG, "stl", ["liver"], 4000, desc="Largest internal organ: metabolism, detox, bile, clotting factors, albumin."),
        S("Gallbladder", DG, "leaf", ["gallbladder"], 700, desc="Stores and concentrates bile; RUQ pain when stones block the cystic duct."),
        S("Bile ducts", DG, "leaf", ["common hepatic duct","cystic duct","left hepatic duct","right hepatic duct"], 900, desc=None),
        S("Duodenum", DG, "stl", ["duodenum"], 1200, desc="First 25 cm of the small intestine; receives bile and pancreatic juice."),
        S("Jejunum", DG, "stl", ["jejunum"], 3000, desc="Main absorption site."),
        S("Ileum", DG, "stl", ["ileum"], 3000, desc="B12 and bile-salt absorption; ends at the ileocecal valve."),
        S("Appendix", DG, "stl", ["appendix"], 400, desc="McBurney's point."),
        S("Colon", DG, "leaf", ["ascending colon","transverse colon","descending colon","ileocecal junction"], 3600, desc="Absorbs water and electrolytes; forms stool."),
        S("Rectum", DG, "stl", ["rectum"], 700, desc=None)]
