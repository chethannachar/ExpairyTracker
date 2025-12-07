import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F8FF'
  },

  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
  },

  subtitle: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  /* NEW TOP ADD BUTTON */
  addTopBtn: {
    backgroundColor: '#10B981',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchRow: {
    marginTop: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#25324A',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
    width: '90%',
    marginLeft: 21,
  },

  searchInput: {
    flex: 1,
    marginLeft: 18,
    fontSize: 14,
    color: '#223047'
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    flex: 1
  },

  /* NEW BANNER REPLACING HERO */
  bannerBox: {
    width: '100%',
    height: 110,
    borderRadius: 14,
    backgroundColor: '#EAF0FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5E0F2',
    marginBottom: 22,
  },

  bannerText: {
    color: '#3A4A67',
    fontSize: 15,
    fontWeight: '700',
  },

  sectionTop: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F2640'
  },

  viewAll: {
    color: '#4A5FC1',
    fontWeight: '800'
  },

  categoriesWrapper: {
    height: 70,
    justifyContent: 'center'
  },

  pillsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    paddingBottom: 20,
  },

  pill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    height: 44,
    minWidth: 92,
    justifyContent: 'center'
  },

  pillInactive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(34,48,71,0.06)'
  },

  pillActive: {
    backgroundColor: '#3D4BA8'
  },

  pillText: {
    marginLeft: 8,
    fontWeight: '800',
    color: '#274060',
    fontSize: 13
  },

  pillTextActive: {
    color: '#fff'
  },

  rowCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#25324A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    borderWidth: 0.4,
    borderColor: 'rgba(34,48,71,0.03)',
  },

  rowImage: {
    width: 92,
    height: 92,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#F8FBFF'
  },

  rowBody: {
    flex: 1
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F2640'
  },

  rowSubtitle: {
    marginTop: 6,
    color: '#7E8CA6',
    fontWeight: '700'
  },

  radialCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  radialNumber: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F2640'
  },

  radialUnit: {
    fontSize: 9,
    color: '#98A5BF',
    fontWeight: '700'
  },
  /* ---------- MODAL ---------- */
modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalBox: {
  width: '85%',
  backgroundColor: '#fff',
  borderRadius: 16,
  paddingVertical: 20,
  paddingHorizontal: 18,
},
modalTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#07133F',
  marginBottom: 14,
  textAlign: 'center',
},
modalInput: {
  height: 48,
  backgroundColor: '#F5F7FB',
  borderRadius: 10,
  paddingHorizontal: 12,
  color: '#07133F',
  marginBottom: 12,
},
dropdown: {
  backgroundColor: '#F5F7FB',
  borderRadius: 10,
  padding: 10,
  marginBottom: 12,
},
dropdownLabel: {
  fontSize: 14,
  fontWeight: '500',
  marginBottom: 6,
  color: '#07133F',
},
dropdownItem: {
  paddingVertical: 8,
  borderRadius: 8,
  paddingHorizontal: 10,
},
dropdownSelected: {
  backgroundColor: '#07133F18',
},
dropdownText: {
  fontSize: 14,
  color: '#07133F',
},
dropdownTextSelected: {
  fontWeight: '700',
},
dateButton: {
  backgroundColor: '#07133F',
  paddingVertical: 10,
  borderRadius: 10,
  marginTop:18
},
dateButtonText: {
  textAlign: 'center',
  color: '#fff',
  fontSize: 14,
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 24,
},
modalCancel: {
  paddingVertical: 10,
  width: '47%',
  borderRadius: 10,
  backgroundColor: '#F2F4F8',
},
modalCancelText: {
  textAlign: 'center',
  color: '#07133F',
  fontSize: 14,
},
modalAdd: {
  paddingVertical: 10,
  width: '47%',
  borderRadius: 10,
  backgroundColor: '#07133F',
},
modalAddText: {
  textAlign: 'center',
  color: '#fff',
  fontSize: 14,
},
complonentdelete: {
  flex: 1,
  backgroundColor: '#D93A3A',
  paddingVertical: 10,
  borderRadius: 8,
  marginLeft: 8,
  alignItems: 'center',
},
componentcancel: {
  flex: 1,
  backgroundColor: '#E4E7EC',
  paddingVertical: 10,
  borderRadius: 8,
  marginRight: 8,
  alignItems: 'center',
},
archiveHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 18,
  paddingVertical: 14,
  backgroundColor: '#F6F8FF',
  borderBottomWidth: 1,
  borderBottomColor: '#E8EDF6',
},
archiveTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#0F2640',
  letterSpacing: 0.5,
},

  /* ---------- NOTIFICATION BADGE ---------- */
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#25324A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB84D',
  },

  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F2640',
    marginBottom: 4,
  },

  notificationMessage: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    lineHeight: 18,
  },

  notificationTime: {
    fontSize: 11,
    color: '#98A5BF',
    fontWeight: '600',
  },

  notificationDaysLeft: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  notificationDaysText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },

  /* ---------- CUSTOM ALERT ---------- */
  alertContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertBox: {
    width: '82%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#25324A',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    alignItems: 'center',
  },

  alertIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  alertTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2640',
    marginBottom: 10,
    textAlign: 'center',
  },

  alertMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  alertButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },

  alertButtonPrimary: {
    backgroundColor: '#07133F',
  },

  alertButtonDanger: {
    backgroundColor: '#D93A3A',
  },

  alertButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
