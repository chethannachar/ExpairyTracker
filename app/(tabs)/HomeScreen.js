import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F8FF'
  },

  headerArea: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16
  },

  headerGlass: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#25324A',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
    marginTop: 40,
  },

  logo: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F2640'
  },

  logoSub: {
    fontSize: 12,
    color: '#7E8CA6',
    marginTop: 2,
    fontWeight: '600'
  },

  iconBtn: {
    backgroundColor: '#EEF6FF',
    padding: 8,
    borderRadius: 10,
    marginLeft: 8
  },

  searchRow: {
    marginTop: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#25324A',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#223047'
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    flex: 1
  },

  bigHero: {
    height: 140,
    borderRadius: 14,
    backgroundColor: '#3D4BA8',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 22,
  },

  bigHeroLeft: {
    flex: 1,
    paddingRight: 8
  },

  bigHeroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF'
  },

  bigHeroSubtitle: {
    color: 'rgba(255,255,255,0.92)',
    marginTop: 6,
    fontWeight: '600',
    fontSize: 13
  },

  bigHeroActions: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center'
  },

  primaryBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },

  primaryBtnText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '800'
  },

  ghostBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12
  },

  ghostBtnText: {
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '700'
  },

  bigHeroImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.06)'
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

  pillsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    paddingBottom: 16
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
});
