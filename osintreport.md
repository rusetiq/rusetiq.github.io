# Predicting the Break: How Open-Source Flight Tracking Revealed US Military Pre-Positioning Hours Before Iran Attacked the UAE

**Author:** Aarush Diwakar (rusetiq)
**Date:** May 5, 2026
**Location:** Abu Dhabi, UAE
**Primary Tool:** ADS-B Exchange (globe.adsbexchange.com)
**Supporting Sources:** Al Jazeera, CBS News, NPR, Bloomberg, Gulf News, Al-Monitor, Foundation for Defense of Democracies, Wikipedia open-source military databases, FighterControl aviation community, ADS-B Exchange API documentation

---

## Executive Summary

On May 4, 2026, Iran broke a weeks-long ceasefire and launched a coordinated barrage of ballistic missiles, cruise missiles, and drones at the United Arab Emirates, setting an oil refinery ablaze in Fujairah and triggering the first civilian emergency alerts across Abu Dhabi and Dubai in nearly a month. The UAE Ministry of Defence confirmed its air defences engaged 12 ballistic missiles, three cruise missiles, and four drones originating from Iran. Three Indian nationals sustained moderate injuries at the Fujairah Oil Industry Zone.

What is not widely reported is that the precursor signals for this escalation were visible in publicly available flight tracking data in the hours before the first missile was launched. This report documents the chain of open-source aviation indicators observed in real time on May 4, 2026, using ADS-B Exchange, the analysis behind each data point, and how the sequence collectively indicated a significant shift in military posture ahead of renewed hostilities.

No classified or restricted information was accessed. Every data point in this report came from a publicly accessible website.

---

## Background: The Geopolitical Context

To understand why these flight indicators mattered, it is necessary to understand the state of the conflict on May 4, 2026.

### Operation Epic Fury and the 2026 Iran War

The 2026 Iran war began on February 28, when the United States and Israel launched coordinated strikes against Iranian military and nuclear infrastructure in what CENTCOM designated Operation Epic Fury. The US assembled its largest military presence in the Middle East since the 2003 invasion of Iraq, including three aircraft carrier strike groups, more than 50,000 troops, B-2 stealth bombers, F-22 Raptors, F-35s, and a large fleet of aerial refueling tankers.

The UAE had been on the receiving end of Iranian attacks since February 28. According to a Wikipedia compilation of the 2026 Iranian strikes on the UAE, as of April 9, 2026, UAE air defence systems had intercepted and destroyed 537 ballistic missiles, 2,256 drones, and 26 cruise missiles fired from Iran, at a cost of 13 lives and 224 injuries.

### The Ceasefire and Its Fragility

A ceasefire brokered by Pakistan took effect on April 8, pausing the most intensive phase of the conflict. Under its terms, Iran also agreed to reopen the Strait of Hormuz, which had been effectively closed since the war began, strangling approximately one-fifth of the world's seaborne oil supply.

The ceasefire did not hold cleanly. Trump told congressional leaders on April 30 that "hostilities had terminated" and that "there has been no exchange of fire between the United States Forces and Iran since April 7, 2026." But simultaneously, the US launched what it called "Project Freedom," a naval escort operation to push commercial vessels through the Strait of Hormuz. Iran declared this a ceasefire violation and warned it would attack any US forces approaching the strait.

Negotiations between the two sides had deadlocked over Iran's ballistic missile programme and its stranglehold on Hormuz. Trump said he was "not happy" after recent talks. The Pentagon was simultaneously developing military options for a "final blow" against Iran if diplomacy failed.

The ceasefire was intact on paper. In practice, it was one incident away from collapse.

### The UAE's Strategic Position

The UAE occupies a particularly sensitive position in this conflict. It is home to Al Dhafra Air Base, a joint US-UAE military installation approximately 32 kilometres south of Abu Dhabi that hosts around 5,000 US military personnel, F-16E/F Desert Falcon fighters, and has served as a key hub for USAF refueling and ISR operations across the CENTCOM area of responsibility. Al Dhafra had already been struck by a missile during the 2026 Iran war, confirming it as an active Iranian target.

The UAE also operates Al-Safran Air Base (ICAO: OMLW), a $1 billion facility constructed in the Abu Dhabi desert approximately 80 miles southwest of the capital near Madinat Zayed. Built specifically to disperse air assets away from Al Dhafra in case of attack, Al-Safran has hardened aircraft shelters, a subterranean ammunition dump, and a runway long enough to accommodate heavy transport aircraft. The UAE Air Force relocated a Mirage 2000 squadron there in 2007 and the base reached operational status around 2008.

---

## Methodology: How ADS-B Exchange Works

Before documenting the specific indicators, it is important to explain the technical tool used to observe them.

### ADS-B Exchange

ADS-B Exchange (adsbexchange.com) is a community-powered flight tracking platform that aggregates real-time aircraft data from a global network of volunteer ground-based receivers. Unlike commercial alternatives such as FlightRadar24 or FlightAware, ADS-B Exchange does not honour government or military requests to filter specific aircraft from its public display. This policy makes it the primary tool of the global OSINT aviation community for tracking military aircraft.

According to ADS-B Exchange's own documentation, the platform collects data through two main mechanisms:

**ADS-B (Automatic Dependent Surveillance-Broadcast):** Modern aircraft equipped with ADS-B transponders actively broadcast their ICAO hex code, position, altitude, speed, and heading to ground receivers. This data is the most accurate and direct method of tracking.

**MLAT (Multilateration):** Aircraft operating older Mode S transponders without ADS-B broadcast a squawk signal that does not include GPS position. When this signal is detected by multiple ground receivers simultaneously, the platform can calculate the aircraft's position through Time-Difference of Arrival (TDOA) calculations across the receiver network. According to ADS-B Exchange's own API documentation, MLAT positions are calculated from "arrival time differences using multiple receivers" and "outliers and varying accuracy is expected." MLAT requires a minimum of several receivers to produce a position fix.

The platform's military filter, enabled via the dbFlags field in its API (military = dbFlags & 1), flags aircraft whose ICAO hex codes appear in military aircraft databases maintained by the community. The flag does not guarantee an aircraft is military, but positively flagged aircraft with AE-prefix hex codes are almost certainly registered to the United States military, as the AE hex range is assigned to US government and military aircraft by the ICAO.

### Callsign Research

USAF callsigns are semi-standardised within the Air Mobility Command system. The primary reference for this report's callsign analysis is the FighterControl aviation community database and publicly documented AMC callsign conventions. Key verified facts:

- RCH (spoken as "REACH") is the generic callsign for all Air Mobility Command aircraft on an AMC-assigned mission. The name derives from AMC's "Global Reach" operational concept. RCH callsigns are used by C-17, C-5, KC-135, KC-46, and contracted charter aircraft operating under AMC tasking.
- MOOSE is a documented static callsign associated with C-17 Globemaster III operations. Multiple aviation community sources including FighterControl confirm "MOOSE is usually a C-17."
- CNV (spoken as "Convoy") is the US Navy air transport callsign series, used by C-40A Clipper aircraft operated by Navy air logistics.
- Four-digit RCH numbers are noted by the FighterControl community as sometimes indicating "special mission callsigns" and "spooky things trying to sneak through unnoticed."

---

## The Indicator Chain

### Indicator 1: USAF C-17 Landing at an Unmarked Desert Airstrip Near the E40

The single most significant indicator observed on May 4 was a USAF aircraft operating under a MOOSE-series callsign routing to an airstrip in the Abu Dhabi interior desert in the E40 highway corridor, in the vicinity of the Rumah area. The specific callsign suffix observed cannot be confirmed with certainty from the available data, and this report refers to the contact generically as a MOOSE-series C-17 rather than asserting a specific flight number.

This strip is visible on commercial satellite mapping but carries no official civilian aviation designation. It does not appear in standard aviation databases as a civil or publicly acknowledged military airfield. It is located in the desert interior of Abu Dhabi emirate, well away from Al Dhafra, Al-Safran, or any other officially acknowledged base.

**Why this is anomalous:**

The C-17 Globemaster III is a heavy strategic airlift aircraft. It does not divert to unmarked desert strips for convenience. Al Dhafra Air Base, with two 3,661-metre asphalt runways and a full US military logistics infrastructure, is readily available in the Abu Dhabi area. A C-17 routing to an unmarked strip when Al Dhafra is accessible represents a deliberate operational choice.

The use of dispersed, non-publicly-acknowledged forward operating locations during an active conflict serves a specific purpose: survivability. If Al Dhafra were to come under Iranian ballistic missile attack, assets at a dispersed strip in the interior would survive the strike. Al Dhafra has already been hit during the 2026 Iran war. The UAE specifically built Al-Safran for exactly this force dispersal logic, and the pattern of using secondary strips in the interior desert is consistent with that doctrine.

A C-17 landing at such a location during heightened ceasefire tensions is most consistent with one of three operational purposes: pre-positioning of munitions or critical equipment at a survivable secondary location, special operations logistical support, or contingency base activation in anticipation of renewed hostilities.

**What the ADS-B data showed:**

MOOSE40 was detected via ADS-B with an AE-prefix hex code, confirming US military registration. The flight profile was consistent with a C-17 approach and landing sequence. The destination was the unmarked strip in the E40 corridor rather than any publicly acknowledged airfield.

**Assessment:** USAF was pre-positioning assets at a covert forward location in advance of anticipated renewed hostilities, prioritising survivability over the convenience of established infrastructure.

---

### Indicator 2: Simultaneous Presence of Multiple USAF Airlift Callsigns

Beyond MOOSE40, multiple additional USAF Air Mobility Command callsigns were simultaneously observable over the UAE and Gulf region on the afternoon and evening of May 4:

**RCH317 and RCH308** (Hex codes AE0655 and AE0803): RCH callsigns on three-digit suffixes are standard AMC transport operations, most commonly C-17 or C-5 airlift missions transporting personnel, equipment, or cargo. Two simultaneous RCH flights in the region indicates active airlift into the theater.

**MOOSE59 and MOOSE60** (Hex codes AE07D8 and AE07EF): Sequential MOOSE callsigns flying together indicate a paired formation or same-day mission package. Two C-17s operating under sequential callsigns suggests a coordinated multi-aircraft airlift event rather than independent logistics flights.

**CNV4828** (Hex code AE147A): The CNV callsign series belongs to US Navy air transport, specifically C-40A Clipper aircraft operated by the Navy Air Logistics Office. C-40A aircraft are Boeing 737-based transports used for high-priority personnel and cargo movement. Their presence typically indicates movement of senior personnel, flag officers, or time-critical equipment.

**A further unidentified AE-prefix aircraft** (Hex code AE5F9A) was also observed in the region without a visible callsign, consistent with a military aircraft choosing not to broadcast its identity.

The density of AMC airlift traffic in the region on this date was elevated above routine sustainment levels. Taken alone, each flight is explicable as logistics. The concentration of multiple airlift callsigns alongside the MOOSE40 anomaly strengthens the overall pattern.

**Assessment:** Sustained and elevated AMC airlift activity consistent with pre-hostilities force sustainment and equipment pre-positioning across multiple aircraft simultaneously.

---

### Indicator 3: MARS04, a Deliberately Obscured Military Aircraft

A military aircraft operating under callsign MARS04 was observed transiting the Abu Dhabi area at altitudes between 17,500 and 20,000 feet, on a heading of approximately 223 degrees (southwest) toward the Saudi border and Oman direction.

**The anomalies in this contact:**

The ICAO hex code broadcast by this aircraft was 000001, a null or placeholder value that does not correspond to any registered aircraft in any national or international database. Valid ICAO hex codes are 24-bit values assigned by national aviation authorities. A hex code of 000001 is essentially a zeroed-out address, meaning the aircraft either had its transponder programmed with a deliberately invalid code or the MLAT reconstruction produced an artifact. Either explanation indicates an aircraft operating outside normal identification conventions.

The contact was tracked purely via MLAT from five receivers, meaning the aircraft was not broadcasting an ADS-B position. Its ADS-B version was listed as "none," confirming it was not equipped with or not using a standard ADS-B transponder. It was being passively detected by the receiver network from its Mode S squawk alone.

The speed profile (Mach 0.54, 328 knots groundspeed, 258 knots indicated at 17,500-20,000 feet) is inconsistent with a fast jet in a combat or transit profile. It is consistent with an ISR platform, liaison aircraft, or light transport type operating in a persistent surveillance or coordination role.

The MARS callsign in the USAF context has documented associations with AFCENT operations across the Gulf, appearing in OSINT community logs tied to operations from Al Dhafra and Al Udeid Air Base in Qatar. The MARS prefix is distinctly American in format, using an English word combined with a number, consistent with USAF callsign conventions rather than UAE or other regional air forces, which typically use numeric-only or differently formatted identifiers.

**The selected altitude of 20,000 feet** is a classic military transit altitude, high enough for fuel-efficient cruise and wide area surveillance coverage, low enough to remain operationally flexible and below most controlled commercial airways.

**Assessment:** A deliberately unidentifiable USAF aircraft, likely in an ISR, liaison, or airborne command relay role, conducting operations in the Abu Dhabi corridor in a deliberate emissions-minimised posture consistent with pre-strike or heightened-alert activity.

---

### Indicator 4: KC-135R Tanker Holding in a Racetrack Orbit at the Eastern Mouth of the Strait of Hormuz

A USAF Boeing KC-135R Stratotanker, hex code AE013B, registration 57-1435, was observed flying a sustained racetrack orbit pattern over the Gulf of Oman at the following parameters:

- Position: 24.613N, 57.893E
- Altitude: 21,000 feet, level (0 ft/min vertical rate)
- Groundspeed: 388 knots
- Track: 32.9 degrees, turning left at -1.09 degrees per second
- Roll: -21.1 degrees (consistent with the banked turn of an oval orbit)
- No callsign broadcast
- No ADS-B, tracked via MLAT from 4 receivers
- Squawk: 1137

The geographic position of this orbit is significant. Coordinates 24.613N, 57.893E place the aircraft directly over the Gulf of Oman at the eastern mouth of the Strait of Hormuz, the narrow waterway between Iran and Oman through which approximately one-fifth of the world's seaborne oil supply normally passes. On May 4, this was the exact location where US forces were actively operating under Project Freedom, escorting commercial shipping through the strait and engaging Iranian small boats that attempted to interfere.

**What a KC-135 orbit at this position means:**

A tanker in a racetrack orbit is providing an aerial refueling anchor point, a fixed location in the sky where receiver aircraft can rendezvous for fuel without the tanker having to transit to them. The position of this orbit, directly at the eastern Hormuz mouth, is not consistent with routine Gulf-wide tanker support. It is consistent with providing dedicated refueling coverage for whatever CENTCOM assets were actively operating in and around the strait during the Project Freedom escort mission on May 4.

Aircraft that would require this kind of dedicated forward tanker support in that location include Navy F/A-18 Super Hornets operating from carrier strike groups in the Arabian Sea, maritime patrol aircraft conducting surveillance over Hormuz, and USAF combat aircraft supporting the escort operation. The absence of a callsign broadcast and the MLAT-only tracking are consistent with a tanker operating in a deliberate low-profile posture.

The racetrack orbit pattern is clearly visible in the ADS-B Exchange trail data, showing the aircraft completing repeated oval circuits over the same geographic area rather than transiting between points.

**Assessment:** A dedicated USAF aerial refueling asset was providing continuous on-station tanker support for active US military operations in the Strait of Hormuz on May 4, directly corroborating the elevated operational tempo visible across the other contacts observed that day.

---

## The Outcome: Iran Breaks the Ceasefire

At approximately 5:00 PM GST on May 4, 2026, emergency alerts were transmitted to mobile phones across Dubai and Abu Dhabi, the first such alerts in nearly a month since the April 8 ceasefire.

According to the UAE Ministry of Defence statement and subsequent reporting by Al Jazeera, CBS News, NPR, and Gulf News, Iran had launched the following against the UAE:

- 12 ballistic missiles
- 3 cruise missiles
- 4 drones

UAE air defence systems, including THAAD and Patriot batteries, intercepted the incoming threats. One drone struck the Fujairah Oil Industry Zone, sparking a large fire at what is the UAE's primary oil export outlet outside the Strait of Hormuz, and the terminus of the Abu Dhabi Crude Oil Pipeline built specifically to bypass the strait. Three Indian nationals sustained moderate injuries at the site and were hospitalised.

Iran also launched two drones at an ADNOC-affiliated crude oil tanker transiting the Strait of Hormuz. UAE Presidential Adviser Anwar Gargash condemned the attack on the Barakah oil tanker as "maritime piracy." ADNOC confirmed no injuries and the vessel was not loaded at the time.

Four separate emergency alerts were issued across the UAE throughout the day. Commercial aircraft inbound to Dubai International Airport turned around mid-air. The UAE Ministry of Education and Ministry of Higher Education both ordered all schools, universities, and nurseries nationwide to shift to distance learning from May 5 through May 8, 2026, with a possible extension under review.

The UAE Ministry of Foreign Affairs condemned in the "strongest terms the renewed terrorist, unprovoked Iranian attacks, targeting civilian sites and facilities in the country."

The attacks were triggered by the US launch of "Project Freedom," a naval escort initiative to push commercial shipping through the Strait of Hormuz. CENTCOM Commander Admiral Brad Cooper confirmed US forces successfully escorted two US-flagged merchant vessels through the strait on May 4, and that US forces destroyed six Iranian small boats that attempted to interfere with the operation. Brent crude briefly spiked approximately 5% before settling near $114 per barrel following news of the UAE interceptions.

Saudi Arabia, Qatar, Kuwait, Bahrain, Jordan, Canada, Germany, and the United Kingdom all condemned the Iranian attacks. EU Commission President Ursula von der Leyen called them "a clear violation of sovereignty and international law."

---

## Analysis: Reading the Pattern in Real Time

Individually, each of the four indicators documented above has a routine explanation:

- A C-17 at an unusual location could be an emergency divert or a routine liaison flight
- Multiple AMC callsigns in the Gulf are normal during sustained operations
- An obscured military contact over Abu Dhabi is unremarkable given the volume of military traffic in the region
- A military helicopter at low altitude could be any number of routine tasking profiles

The pattern only becomes meaningful when examined collectively, in context, and with an understanding of the underlying geopolitical situation.

The MOOSE40 contact is the most significant single data point because it departs most dramatically from the baseline. Al Dhafra is available, well-equipped, and regularly used by US airlift assets. Choosing an unmarked interior strip instead requires an active operational reason. During a period when the ceasefire was publicly fraying, negotiations were deadlocked, and Iran had threatened to attack any US forces near the strait, force survivability is the most compelling reason.

The density of simultaneous AMC callsigns reinforces that this was an elevated operational tempo moment rather than routine sustainment. The MARS04 contact adds the dimension of deliberate concealment, suggesting the US was operating in a posture that minimised its electronic signature, consistent with pre-kinetic or heightened-alert activity. The DU-202 AW139 adds the dimension of UAE air defence activation, suggesting Emirati forces were also responding to something.

The ceasefire was effectively over before the first missile was publicly reported. The flight tracking data reflected that reality hours earlier.

---

## Why ADS-B Exchange Specifically

It is worth addressing why ADS-B Exchange in particular enables this kind of analysis when commercial alternatives do not.

Commercial flight tracking platforms including FlightRadar24 and FlightAware comply with requests from governments and militaries to filter specific aircraft from their public displays. This is standard practice and these platforms implement it at scale. As a result, military aircraft frequently disappear from these platforms' public views even while broadcasting normally.

ADS-B Exchange, by policy, does not accept such filtering requests. Every aircraft visible to its global receiver network appears on its public map, regardless of whether a government has requested otherwise. This policy is the reason the platform has become the primary tool for open-source military aviation analysis globally.

The same policy means ADS-B Exchange captures MLAT contacts, military hex codes, null ICAO addresses like 000001, and other anomalous contacts that filtered platforms would suppress. It is precisely the anomalies that carry the most intelligence value.

It should be noted that ADS-B Exchange is not a complete picture of military activity. Aircraft operating in full emissions-silent mode, without any active transponder, will not appear on any civilian tracking platform. Significant US military assets, particularly stealth aircraft like the F-22, B-2, and F-35 operating in low-observable mode, leave no trace on the civilian tracking network. What ADS-B Exchange captures is therefore a subset of total military activity, but a meaningful and analytically valuable one.

---

## The UAE's Desert Air Infrastructure: Context for the Strip

The unmarked airstrip observed in the E40 corridor exists within a broader UAE strategy of dispersed military air infrastructure.

The UAE Air Force deliberately built multiple operating locations across Abu Dhabi emirate to prevent a single strike from neutralising its air power. Al Dhafra Air Base is the primary hub. Al-Safran Air Base near Madinat Zayed is the primary dispersal base, specifically constructed at a cost of $1 billion to house assets away from Al Dhafra. Its existence was first publicly identified by a Military.com correspondent in 2011 who noticed construction visible on Google Maps near Madinat Zayed and received no comment from UAE embassy officials. Al Minhad Air Base near Dubai serves the central air command.

The strip observed near the E40 Rumah corridor is distinct from Al-Safran in location, appearing to be a smaller auxiliary strip rather than a major base. Its existence is consistent with UAE doctrine of maintaining multiple dispersed operating locations across the interior desert. The US military's use of such a strip, rather than Al Dhafra, reflects awareness of the threat environment and deliberate survivability planning.

---

## Limitations and Epistemic Honesty

This report makes inferences from open-source data. Several important limitations apply:

**Correlation is not causation.** The flight indicators documented here are consistent with the events that followed, but they do not prove that those specific aircraft movements caused or were directly connected to the Iranian decision to launch. Iran's decision to attack on May 4 was driven by the US Project Freedom operation and the broader diplomatic breakdown, not by the presence of a C-17 at a desert strip.

**Incomplete picture.** ADS-B Exchange captures only aircraft broadcasting or detectable via MLAT. Military assets operating in full emissions-silent mode are invisible to civilian tracking. The total scope of US military activity on May 4 was certainly larger than what appeared on the platform.

**Retrospective clarity.** These connections are articulated more clearly after the fact than they could be acted upon with full confidence in real time. Pattern recognition in live OSINT carries inherent uncertainty that a written analysis can smooth over.

**Classification gap.** The actual cargo of the MOOSE-series C-17, the actual tasking of MARS04, and the actual receiver aircraft being supported by the KC-135R orbit are unknown. Assessments are inferences based on open-source pattern matching against known conventions and context, not confirmed facts.

**Single-observer limitation.** This analysis reflects observations made by one person over one session. A structured monitoring operation with multiple analysts and a longer observation window would produce more robust conclusions.

---

## Conclusion

Open-source aviation data contains a significant amount of signal about real-world military activity. That signal is accessible to anyone willing to learn what to look for and to apply it in context. The indicators documented in this report were visible on a free public website before the first missile alert reached the phones of UAE residents.

The MOOSE-series C-17 contact at an unmarked desert strip was the clearest single indicator: a deliberate departure from normal operating patterns in a context where force survivability mattered. The surrounding pattern of elevated AMC activity, a deliberately obscured ISR contact, and a KC-135 holding a forward orbit directly over the eastern mouth of the Strait of Hormuz reinforced the picture.

None of this required classified access. None of it required special equipment. It required knowing what callsigns mean, understanding why military aircraft choose unusual routes, recognising when a flight profile is tactically rather than logistically driven, and situating all of it within the correct geopolitical context.

The attacks on the UAE were visible in the flight data before they were on the news.

---

## Appendix A: Aircraft Contacts Referenced

| Callsign | Hex Code | Type | Source | Assessment |
|----------|----------|------|--------|------------|
| MOOSE-series | AE-prefix | C-17 Globemaster III | ADS-B | USAF airlift, routed to unmarked E40 corridor strip |
| MARS04 | 000001 | Unknown (ISR/liaison estimated) | MLAT, 5 receivers | Deliberately null hex, no ADS-B, obscured USAF contact |
| RCH317 | AE0655 | C-17 / AMC transport | ADS-B | Standard AMC airlift, Gulf region |
| RCH308 | AE0803 | C-17 / AMC transport | ADS-B | Standard AMC airlift, Gulf region |
| MOOSE59 | AE07D8 | C-17 Globemaster III | ADS-B | USAF airlift, paired formation |
| MOOSE60 | AE07EF | C-17 Globemaster III | ADS-B | USAF airlift, paired formation |
| CNV4828 | AE147A | C-40A Clipper | ADS-B | US Navy air logistics |
| (no callsign) | AE5F9A | Unknown military | ADS-B | AE-prefix, no callsign broadcast |
| (no callsign) | AE013B | KC-135R Stratotanker | MLAT, 4 receivers | Racetrack orbit at eastern Hormuz mouth, forward tanker support |

---

## Appendix B: Sources

**Primary data source:**
- ADS-B Exchange live feed: globe.adsbexchange.com
- ADS-B Exchange API documentation: adsbexchange.com/version-2-api-wip
- ADS-B Exchange MLAT explanation: adsbexchange.com/mlat-beta

**Callsign and aircraft type references:**
- FighterControl aviation community: fightercontrol.co.uk (REACH/MOOSE callsign documentation)
- Feit of Fake: Decoding Air Mobility Command Mission Codes (feitoffake.wordpress.com, December 2025)
- RAF and USAF Callsigns thread, rec.radio.shortwave community archive

**Geopolitical context:**
- Al Jazeera: "UAE accuses Iran of attacks as large fire breaks out at oil refinery," May 4, 2026
- CBS News live updates: Iran war, Strait of Hormuz, May 5, 2026
- NPR: "The U.S. fights to reopen the Strait of Hormuz as UAE says it's attacked by Iran," May 4, 2026
- Bloomberg: "Iran Fires Missiles at UAE, Breaking Ceasefire With First Attack in Weeks," May 4-5, 2026
- Gulf News: "UAE intercepts 12 ballistic missiles, three cruise missiles and four drones from Iran; Schools, universities go online," May 5, 2026
- Al-Monitor: "Iran strikes UAE's Fujairah oil hub as US pushes Hormuz reopening," May 4, 2026
- Foundation for Defense of Democracies: "Iran Strikes UAE, International Ships as Ceasefire Teeters," May 4, 2026
- RFE/RL: "As Cease-Fire With Iran Wavers, US Expands Its Military Footprint," May 2, 2026

**UAE military infrastructure:**
- Wikipedia: Al-Safran Air Base
- Wikipedia: Al Dhafra Air Base
- Wikipedia: United Arab Emirates Air Force
- Wikipedia: 2026 Iranian strikes on the United Arab Emirates
- Military.com: "Name That Mystery Base in the UAE Desert," 2011
- GlobalSecurity.org: Al Dhafra Air Base

**OSINT and flight tracking methodology:**
- ADS-B Exchange: "How ADS-B Exchange Works"
- ITAMilRadar: "Emergency Landing for the Ultra-Secret RQ-180 Drone in Larissa?" March 2026

---

*This report is based entirely on publicly available open-source data. No classified or restricted information was accessed or used. All flight data was collected from ADS-B Exchange, a publicly accessible platform. Callsign assessments reflect documented community conventions and are not confirmed by official sources. Analysis reflects the author's independent assessment and does not represent any official position.*

*The approximate location of the airstrip referenced in Indicator 1 is described generally as the E40 corridor near the Rumah area of Abu Dhabi interior. Precise coordinates are intentionally withheld given the sensitive nature of the ongoing conflict and the location's apparent operational use.*

*Aarush Diwakar | rusetiq.com | Abu Dhabi, UAE | May 2026*
